import { publicProcedure } from '@sovok/server/trpc'
import { PlayInput } from '@sovok/shared/models/play'
import { tracksCache } from '@sovok/server/store/tracks-cache'
import { exists, isNoError } from '@sovok/shared'
import { mpi } from '@sovok/server/mpi'
import {
  InputMessageKind,
  OutputMessage,
  OutputMessageKind,
} from '@sovok/shared/models/download/worker-messages'
import { searchVideos } from '@sovok/shared/utils/youtube/search'
import { MediaSource } from '@sovok/shared/models/media-source'

export const play = publicProcedure
  .input(PlayInput)
  .mutation(async ({ input: { mbid } }) => {
    console.log(tracksCache.dump())
    const track = tracksCache.get(mbid)!
    const searchQuery = `${track.artistFull} - ${track.title}`
    const video = await searchVideos(searchQuery)

    if (!exists(video)) {
      return { error: 'NO_VIDEO_FOUND' }
    }

    mpi.send({
      type: InputMessageKind.DownloadTask,
      task: {
        id: mbid,
        task: {
          source: MediaSource.YouTube,
          info: {
            videoId: video?.videoId,
          },
        },
      },
    })

    const result = await mpi
      .when({
        filter: message =>
          message.type === OutputMessageKind.DownloadSuccess &&
          message.id === mbid,
        timeoutMs: 30_000,
      })
      .catch(e => {
        return { error: 'DOWNLOADING_ISSUE', details: e }
      })
    if (!isNoError<OutputMessage>(result)) {
      return result
    }
    console.log(result)
    if (result.type === OutputMessageKind.DownloadSuccess) {
      return {
        link: result.download.id,
      }
    } else {
      return { error: 'UNREACHABLE_CODE' }
    }
  })

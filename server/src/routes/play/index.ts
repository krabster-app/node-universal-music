import { publicProcedure } from '@sovok/server/trpc'
import { PlayInput } from '@sovok/shared/models/play'
import { exists, isNoError } from '@sovok/shared'
import { mpi } from '@sovok/server/mpi'
import {
  InputMessageKind,
  OutputMessage,
  OutputMessageKind,
} from '@sovok/shared/models/download/worker-messages'
import { searchVideos } from '@sovok/server/utils/youtube/search'
import { MediaSource } from '@sovok/shared/models/media-source'
import { musicBrainzTransformer } from '@sovok/shared/musicbrainz/transformer'
import { mbGetById } from '@sovok/shared/musicbrainz/mb-get-by-id'
import { cacheTrack } from '@sovok/server/repos/cacheTrack'
import { connectTrackToDownloaded } from '@sovok/server/repos/connectTrackToDownloaded'
import { CDN_BASE_URL } from '@sovok/server/config'
import { getTrackById } from '@sovok/server/repos/getTrackById'
import { dbTransformerRecord } from '@sovok/shared/models/transformers/db-transformer-record'
import { TrackInfo } from '@sovok/shared/models/search/track'

const searchVideoSection = (track: TrackInfo) => {
  const searchQuery = `${track.artistFull} - ${track.title}`
  return searchVideos(searchQuery)
}

export const play = publicProcedure
  .input(PlayInput)
  .mutation(async ({ input: { mbid } }) => {
    // Getting info
    console.log('checking database')
    const dbTrack = await getTrackById(mbid)
    let track: TrackInfo | null = null
    if (exists(dbTrack)) {
      track = dbTransformerRecord(dbTrack)
    } else {
      const mbRecord = await mbGetById(mbid, 'recording')
      if (!exists(mbRecord)) {
        return { error: 'MB_NO_RECORD' }
      }
      track = musicBrainzTransformer(mbRecord)
      await cacheTrack(track)
    }

    const top = dbTrack?.trackOnPlatform

    if (exists(top) && top.length > 0) {
      return {
        track: {
          ...track,
        },
        link: `${CDN_BASE_URL}${top[0].key}`,
      }
    } else {
      const video = await searchVideoSection(track)
      if (!exists(video)) {
        return { error: 'NO_VIDEO_FOUND' }
      }

      const platform = MediaSource.YouTube

      mpi.send({
        type: InputMessageKind.DownloadTask,
        task: {
          id: mbid,
          task: {
            source: platform,
            info: {
              videoId: video?.videoId,
            },
            meta: {
              title: track.title,
              artist: track.artistFull,
              platform: platform,
            },
            mbid: mbid,
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
        const linked = await connectTrackToDownloaded(track.id, {
          key: result.download.id,
          platform: platform,
        })
        return {
          track: {
            ...track,
          },
          link: `${CDN_BASE_URL}${linked.key}`,
        }
      } else {
        return { error: 'UNREACHABLE_CODE' }
      }
    }
  })

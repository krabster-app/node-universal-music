import { trackCacheStore } from '@client/stores/trackCache.store.ts'
import { exists, isNoError } from '@sovok/shared'
import { COVER_PLACEHOLDER } from '@client/components/player/common.ts'
import { trpc } from '@client/trpc.ts'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'
import { CachedTrackInfo } from '@client/stores/idb.ts'

export const playerInstance = new Audio()

playerInstance.preload = 'auto'

export class PlayerController {
  constructor() {}

  private play(url: string) {
    playerInstance.src = url
  }

  private onNewSource({
    title,
    artist,
    cover,
  }: {
    title: string
    artist: string
    cover: string
  }) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        artwork: [
          {
            src: cover,
            sizes: '250x250',
            type: 'image/png',
          },
        ],
      })

      navigator.mediaSession.setActionHandler('nexttrack', () =>
        console.log('next track wanted'),
      )

      navigator.mediaSession.setActionHandler('previoustrack', () =>
        console.log('prev track wanted'),
      )

      navigator.mediaSession.setActionHandler('seekto', e =>
        console.log('seek', e.seekTime),
      )
    }
  }

  private startPlaying(cachedEntry: CachedTrackInfo) {
    if (!exists(cachedEntry.link)) {
      console.error($line, 'CANNOT_PLAY_CACHED_TRACK (no link)', cachedEntry.id)
      return
    }
    this.onNewSource({
      title: cachedEntry.title,
      artist: cachedEntry.artistFull,
      cover: (cachedEntry.coverUrl ?? COVER_PLACEHOLDER).replace('##', '250'),
    })
    this.play(cachedEntry.link)
  }

  async requestPlay(mbid: string) {
    /*
    1. Check if already cached in iDB     PLAY
    2. Request from server & wait         PLAY
     */
    const cachedEntry = await trackCacheStore.get(mbid)
    if (exists(cachedEntry) && exists(cachedEntry.link)) {
      this.startPlaying(cachedEntry)
    } else {
      const { trigger } = await trpc.play.useSWRMutation()
      const data = await trigger({
        mbid: mbid,
      })
      console.log(data)
      if (isNoError<{ track: TrackInfo; link: string }>(data)) {
        this.startPlaying(data as unknown as CachedTrackInfo)
        await trackCacheStore.set(data.track.id, {
          ...data.track,
          link: data.link,
        })
      }
      console.error('CANNOT GET DATA', $line)
      return
    }
  }
}

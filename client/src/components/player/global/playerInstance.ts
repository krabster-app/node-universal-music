import { trackCacheStore } from '@client/stores/trackCache.store.ts'
import { exists, isNoError } from '@sovok/shared'
import { COVER_PLACEHOLDER } from '@client/components/player/common.ts'
import { trpc } from '@client/trpc.ts'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'
import { CachedTrackInfo } from '@client/stores/idb.ts'
import {
  useCurrentTrack,
  usePlayerState,
} from '@client/stores/currentTrack.store.tsx'

export const playerInstance = new Audio()

playerInstance.preload = 'auto'

const {
  set: setCurrentTrack,
  current: { id: currentTrackIdFromStore },
} = await useCurrentTrack.getState()
const { patch } = usePlayerState.getState()
const setPlaying = (value: boolean) =>
  patch({
    isPlaying: value,
  })
const setTrackLength = (value: number) =>
  patch({
    trackLength: value,
  })

playerInstance.addEventListener('loadedmetadata', () => {
  console.log('loaded meta')
  setTrackLength(playerInstance.duration)
})

playerInstance.addEventListener('ended', () => {
  console.log('ended')
  setPlaying(false)
  playerInstance.currentTime = 0
})

playerInstance.addEventListener('play', () => setPlaying(true))

playerInstance.addEventListener('pause', () => setPlaying(false))

export class PlayerController {
  openPlayer: () => Promise<void>
  constructor(_openPlayer: () => Promise<void>) {
    this.openPlayer = _openPlayer
  }

  private async play(url: string) {
    playerInstance.src = url
    await playerInstance.play()
    await this.openPlayer()
  }

  async pause() {
    playerInstance.pause()
  }

  async continue() {
    if (playerInstance.src.length > 0) {
      await playerInstance.play()
    } else {
      console.log('no source')
      if (exists(currentTrackIdFromStore)) {
        const track = await trackCacheStore.get(currentTrackIdFromStore)
        if (!exists(track)) {
          console.error($line, 'no track found while continue')
          return
        }
        this.startPlaying(track)
      }
    }
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

  private async startPlaying(cachedEntry: CachedTrackInfo) {
    if (!exists(cachedEntry.link)) {
      console.error($line, 'CANNOT_PLAY_CACHED_TRACK (no link)', cachedEntry.id)
      return
    }
    this.onNewSource({
      title: cachedEntry.title,
      artist: cachedEntry.artistFull,
      cover: (cachedEntry.coverUrl ?? COVER_PLACEHOLDER).replace('##', '250'),
    })
    setCurrentTrack(cachedEntry)
    await this.play(cachedEntry.link)
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
      const data = await trpc.play.mutate({
        mbid: mbid,
      })
      console.log(data)
      if (isNoError<{ track: TrackInfo; link: string }>(data)) {
        this.startPlaying(data as unknown as CachedTrackInfo)
        console.log('putting', data.track.id, {
          ...data.track,
          link: data.link,
        })
        console.log(
          await trackCacheStore.set({
            ...data.track,
            link: data.link,
          }),
        )
        return
      }
      console.error('CANNOT GET DATA', $line)
      return
    }
  }
}

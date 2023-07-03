import { create } from 'zustand'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'
import { CachedTrackInfo } from '@client/stores/idb.ts'
import { exists } from '@sovok/shared'
import { trackCacheStore } from '@client/stores/trackCache.store.ts'

type CurrentTrackStore = {
  current: Partial<TrackInfo>
  set: (payload: Partial<TrackInfo>) => void
  patch: (payload: Partial<TrackInfo>) => void
}

const restoredCurrentTrackId = localStorage.getItem('currentTrackId')

let track: CachedTrackInfo | undefined

if (exists(restoredCurrentTrackId) && restoredCurrentTrackId.length > 0) {
  track = await trackCacheStore.get(restoredCurrentTrackId)
}

export const useCurrentTrack = create<CurrentTrackStore>()(set => ({
  current: {
    title: track?.title ?? 'Waiting...',
    artistFull: track?.artistFull ?? 'Waiting...',
    coverUrl: track?.coverUrl ?? undefined,
    id: track?.id,
  },
  set: (payload: Partial<TrackInfo>) => set(() => ({ current: payload })),
  patch: (payload: Partial<TrackInfo>) =>
    set(state => ({ current: { ...state.current, ...payload } })),
}))

useCurrentTrack.subscribe((state, prevState) => {
  if (state.current.id !== prevState.current.id) {
    localStorage.setItem('currentTrackId', state.current.id ?? '')
  }
})

type PlayerStateStore = {
  current: {
    trackLength: number
    isPlaying: boolean
  }
  set: (payload: PlayerStateStore['current']) => void
  patch: (payload: Partial<PlayerStateStore['current']>) => void
}

export const usePlayerState = create<PlayerStateStore>()(set => ({
  current: {
    trackLength: 0,
    isPlaying: false,
  },
  set: (payload: PlayerStateStore['current']) =>
    set(() => ({ current: payload })),
  patch: (payload: Partial<PlayerStateStore['current']>) =>
    set(state => ({ current: { ...state.current, ...payload } })),
}))

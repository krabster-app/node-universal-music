import { create } from 'zustand'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'

type Store = {
  current: Partial<TrackInfo>
  set: (payload: Partial<TrackInfo>) => void
}

export const useCurrentTrack = create<Store>()(set => ({
  current: {},
  set: (payload: Partial<TrackInfo>) =>
    set(state => ({ current: { ...state.current, ...payload } })),
}))

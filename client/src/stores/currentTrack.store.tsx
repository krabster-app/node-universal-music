import { create } from 'zustand'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'
import coverUrl from '@sovok/client/assets/sampleCover2.png'

type Store = {
  current: Partial<TrackInfo>
  set: (payload: Partial<TrackInfo>) => void
}

export const useCurrentTrack = create<Store>()(set => ({
  current: {
    title: 'SeanPaulWasNeverThereToGimmeTheLight',
    artistFull: 'BONES feat. UrMom',
    coverUrl,
  },
  set: (payload: Partial<TrackInfo>) =>
    set(state => ({ current: { ...state.current, ...payload } })),
}))

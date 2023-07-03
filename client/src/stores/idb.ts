import { openDB } from 'idb'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'

export type CachedTrackInfo = Pick<
  TrackInfo,
  'id' | 'title' | 'coverUrl' | 'artistFull'
> &
  Partial<TrackInfo> & {
    link?: string
  }
export const idb = openDB<{
  tracks: {
    key: string
    value: CachedTrackInfo
  }
}>('database', 1, {
  upgrade: (db, oldVersion, newVersion) => {
    switch (oldVersion) {
      // @ts-ignore:TS7029 - fallthrough
      case 0:
        db.createObjectStore('tracks', { keyPath: 'id' })
      case 1:
        console.log(
          'current version',
          newVersion,
          ', applied migrations from ',
          oldVersion,
        )
    }
  },
})

export type IDBType = Awaited<typeof idb>

export const getIDB = () => idb

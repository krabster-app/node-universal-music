import { CachedTrackInfo, getIDB, IDBType } from '@client/stores/idb.ts'

class TrackCacheStore {
  tableName = 'tracks' as const
  idb: IDBType
  constructor(_idb: IDBType) {
    this.idb = _idb
  }

  get(key: string) {
    return this.idb.get(this.tableName, key)
  }
  set(val: CachedTrackInfo) {
    return this.idb.put(this.tableName, val)
  }
  has(key: string): boolean {
    return Boolean(this.get(key))
  }
  del(key: string) {
    return this.idb.delete(this.tableName, key)
  }
  clear() {
    return this.idb.clear(this.tableName)
  }
  keys() {
    return this.idb.getAllKeys(this.tableName)
  }
}

export const trackCacheStore = new TrackCacheStore(await getIDB())

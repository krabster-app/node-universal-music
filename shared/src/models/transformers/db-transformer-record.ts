import {
  TrackArtist,
  TrackInfo,
  TrackRelease,
} from '@sovok/shared/models/search/track'
import { Platform } from '@prisma/client'

export type DBTrack = Pick<TrackInfo, 'id' | 'title' | 'coverUrl'> & {
  disambiguation: TrackInfo['disambiguation'] | null
} & {
  artistsMap:
    | {
        artist: Pick<TrackArtist['artist'], 'name' | 'id'>
        prefix: TrackArtist['joinphrase'] | null
      }[]
  releaseMap:
    | {
        release: Pick<TrackRelease, 'id' | 'title' | 'status'> & {
          disambiguation: TrackRelease['disambiguation'] | null
        }
      }[]
  trackOnPlatform: {
    platform: Platform
    key: string
  }[]
}

export const dbTransformerRecord = (
  track: DBTrack,
): TrackInfo & {
  trackOnPlatform: {
    platform: Platform
    key: string
  }[]
} => {
  return {
    id: track.id,
    title: track.title,
    length: 0,
    artistFull: track.artistsMap.reduce((a, v) => {
      return `${a}${v.prefix || ''}${v.artist.name}`
    }, ''),
    artists: track.artistsMap.map(v => ({
      joinphrase: v.prefix || undefined,
      name: v.artist.name,
      artist: v.artist,
    })),
    release: {
      ...track.releaseMap[0].release,
      disambiguation: track.releaseMap[0].release.disambiguation || undefined,
    },
    disambiguation: track.disambiguation || '',
    coverUrl: track.coverUrl || null,
    trackOnPlatform: track.trackOnPlatform,
  }
}

import { exists } from '../guards'
import { TrackInfo } from '../models/search/track'
import { getCoverUrl } from './get-cover-url'
import { MBRecording } from './types'

export const musicBrainzTransformer = (mbRecording: MBRecording): TrackInfo => {
  const release =
    mbRecording.releases?.find(v => v.status === 'Official') ??
    mbRecording.releases?.at(0)

  return {
    id: mbRecording.id,
    title: mbRecording.title, // track title
    length: mbRecording.length, // length in ms
    disambiguation: mbRecording.disambiguation, // "clean"
    artists: mbRecording['artist-credit'].map(v => ({
      joinphrase: v.joinphrase,
      name: v.name, // concatßenated artist names
      artist: {
        id: v.artist.id, // inner artist id
        name: v.artist.name, // artist name
      },
    })),
    artistFull: mbRecording['artist-credit'].reduce((acc, v) => {
      return `${acc}${v.name}${v.joinphrase !== undefined ? v.joinphrase : ''}`
    }, ''),
    coverUrl: exists(release) ? getCoverUrl(release.id) : null, // http://coverartarchive.org/release/{MBID}/front-250/500/1200
    release: exists(release)
      ? {
          id: release.id,
          title: release.title,
          status: release.status, // 'Official'
          disambiguation: release.disambiguation,
        }
      : null,
    tags: [],
  }
}

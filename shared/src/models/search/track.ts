export type MBID = string

export type TrackInfo = {
  id: MBID
  title: string // track title
  length: number // length in ms
  disambiguation: string // "clean"
  artists: TrackArtist[]
  artistFull: string
  coverUrl: string | null // http://coverartarchive.org/release/{MBID}/front-250/500/1200
  release: TrackRelease | null // main release
  tags?: string[]
}

export type TrackArtist = {
  joinphrase?: string
  name: string // concatßenated artist names
  artist: {
    id: MBID // inner artist id
    name: string // artist name
  }
}

export type TrackRelease = {
  id: MBID
  title: string
  status: string // 'Official'
  disambiguation?: string // 'clean'
}

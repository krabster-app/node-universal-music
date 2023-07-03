export type MBID = string

export type ISODate = string

export type ISODayDate = string

export const WORLDWIDE_COUNTRY = 'XW'

export type MBEntityType = 'recording' | 'release' | 'artist'

export type MBReturnType<T extends MBEntityType> = T extends 'recording'
  ? MBRecording
  : never

export type MusicBrainzRecordingSearchAnswer = {
  created: ISODate // ISODate
  count: number
  offset: number
  recordings: MBRecording[]
}

export type MBRecording = {
  id: MBID // inner id
  title: string // track title
  length: number // length in ms
  disambiguation: string // "clean"
  video?: unknown // any
  'artist-credit': MBArtist[]
  'first-release-date': ISODayDate // yyyy-mm-dd
  releases?: MBRelease[]
  tags?: MBRecordingTag[]
}

export type MBRecordingTag = {
  count: number
  name: string
}

export type MBArtist = {
  joinphrase?: string
  name: string // concatenated artist names
  artist: {
    id: MBID // inner artist id
    name: string // artist name
    'sort-name': string // last, first
    aliases?: MBArtistAlias[]
  }
}

export type MBArtistAlias = {
  'sort-name': string
  'type-id': MBID
  name: string // artist name
  locale: string
  type: string // 'Legal name'
  'begin-date'?: ISODate | null
  'end-date'?: ISODate | null
}

export type MBRelease = {
  id: MBID
  'status-id': MBID
  count: 1
  title: string
  status: string // 'Official'
  disambiguation?: string // 'clean'
  'artist-credit': MBArtist[]
  'release-group': {
    id: MBID
    'type-id': string
    'primary-type-id': string
    title: string
    'primary-type': string // 'Album'
  }
  date: ISODayDate
  country: string // length 2
  'track-count': number // count of tracks in album
}

export type MBResultGetRecording<Main extends boolean> = {
  disambiguation: true
  id: '8f7f32a5-36c7-4f5d-9d31-f771be370737'
  'first-release-date': '2017-06-15'
  'artist-credit': Main extends true
    ? [
        {
          name: 'Bones'
          artist: {
            'type-id': 'b6e035f4-3ce9-331c-97df-83397230b0df'
            name: 'Bones'
            disambiguation: 'US rapper'
            type: 'Person'
            'sort-name': 'Bones'
            id: 'e3f7631b-e50b-4923-9049-2fa84dfcaf71'
          }
          joinphrase: ''
        },
      ]
    : never
  length: 261000
  video: false
  releases: Main extends true
    ? [
        {
          status: 'Official'
          date: '2017-06-15'
          disambiguation: ''
          id: '133eb34a-75f6-4c4a-bcd1-2ba26bbd3211'
          'release-events': [
            {
              date: '2017-06-15'
              area: {
                'iso-3166-1-codes': ['XW']
                name: '[Worldwide]'
                disambiguation: ''
                'sort-name': '[Worldwide]'
                type: null
                id: '525d4e18-3d00-31b9-a58b-a146a916de8f'
                'type-id': null
              }
            },
          ]
          'text-representation': {
            language: 'eng'
            script: 'Latn'
          }
          packaging: null
          barcode: null
          title: 'NoRedeemingQualities'
          country: 'XW'
          'status-id': '4e304316-386d-3409-af2e-78857eec5cfe'
          quality: 'normal'
          'packaging-id': null
        },
      ]
    : never
  title: 'SeanPaulWasNeverThereToGimmeTheLight'
}

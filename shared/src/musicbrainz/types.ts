export type MBID = string

export type ISODate = string

export type ISODayDate = string

export const WORLDWIDE_COUNTRY = 'XW'

export type MusicBrainzAnswer = {
  created: ISODate // ISODate
  count: number
  offset: number
  recordings: MusicBrainzRecording[]
}

export type MusicBrainzRecording = {
  id: MBID // inner id
  score: number // int score
  title: string // track title
  length: number // length in ms
  disambiguation: string // "clean"
  video?: unknown // any
  'artist-credit': MusicBrainzArtist[]
  'first-release-date': ISODayDate // yyyy-mm-dd
  releases?: MusicBrainzRelease[]
  isrcs: string[]
  tags?: MusicBrainzRecordingTag[]
}

export type MusicBrainzRecordingTag = {
  count: number
  name: string
}

export type MusicBrainzArtist = {
  joinphrase?: string
  name: string // concatenated artist names
  artist: {
    id: MBID // inner artist id
    name: string // artist name
    'sort-name': string // last, first
    aliases?: MusicBrainzArtistAlias[]
  }
}

export type MusicBrainzArtistAlias = {
  'sort-name': string
  'type-id': MBID
  name: string // artist name
  locale: string
  type: string // 'Legal name'
  'begin-date'?: ISODate | null
  'end-date'?: ISODate | null
}

export type MusicBrainzRelease = {
  id: MBID
  'status-id': MBID
  count: 1
  title: string
  status: string // 'Official'
  disambiguation?: string // 'clean'
  'artist-credit': MusicBrainzArtist[]
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
  // 'release-events': [
  //     {
  //         date: ISODayDate
  //         area: {
  //             id: MBID
  //             name: 'Jordan'
  //             'sort-name': 'Jordan'
  //             'iso-3166-1-codes': ['JO']
  //         }
  //     },
  // ]
  // media: [
  //     {
  //         position: 1
  //         format: 'Digital Media'
  //         track: [
  //             {
  //                 id: 'd45db964-34bf-49f4-825b-c65e7f78a74d'
  //                 number: '3'
  //                 title: 'Sippy Cup'
  //                 length: 195076
  //             },
  //         ]
  //         'track-count': 16
  //         'track-offset': 2
  //     },
  // ]
}

const release: MusicBrainzRelease = {
  id: '448bd3e8-eb04-4950-850c-c482d040db2f',
  'status-id': '4e304316-386d-3409-af2e-78857eec5cfe',
  count: 1,
  title: 'Cry Baby',
  status: 'Official',
  disambiguation: 'clean deluxe edition',
  'artist-credit': [
    {
      name: 'Melanie Martinez',
      artist: {
        id: '0df563ec-1a79-486e-a46d-5b9862a40311',
        name: 'Melanie Martinez',
        'sort-name': 'Martinez, Melanie',
      },
    },
  ],
  'release-group': {
    id: '85dd3078-58e9-46fc-b1ae-7d3abfde48c3',
    'type-id': 'f529b476-6e62-324f-b0aa-1f3e33d313fc',
    'primary-type-id': 'f529b476-6e62-324f-b0aa-1f3e33d313fc',
    title: 'Cry Baby',
    'primary-type': 'Album',
  },
  date: '2015-08-14',
  country: 'XW',
  'track-count': 16,
}

const recording: MusicBrainzRecording = {
  id: '6def13d5-6a00-4fb2-a3c7-1d00bcc5ca82',
  score: 100,
  title: 'Sippy Cup',
  length: 195076,
  disambiguation: 'explicit',
  video: null,
  'artist-credit': [
    {
      name: 'Melanie Martinez',
      artist: {
        id: '0df563ec-1a79-486e-a46d-5b9862a40311',
        name: 'Melanie Martinez',
        'sort-name': 'Martinez, Melanie',
        aliases: [
          {
            'sort-name': 'Martinez, Melanie Adele',
            'type-id': 'd4dcd0c0-b341-3612-a332-c0ce797b25cf',
            name: 'Melanie Adele Martinez',
            locale: 'es',
            type: 'Legal name',
            'begin-date': null,
            'end-date': null,
          },
          {
            'sort-name': 'Мелани Мартинес',
            'type-id': '894afba6-2816-3c24-8072-eadb66bd04bc',
            name: 'Мелани Мартинес',
            locale: 'ru',
            type: 'Artist name',
            'begin-date': null,
            'end-date': null,
          },
        ],
      },
    },
  ],
  'first-release-date': '2015-07-31',
  releases: [
    {
      id: 'ae6dcbf3-ae80-4e0b-8ac1-b9a851a2d461',
      'status-id': '4e304316-386d-3409-af2e-78857eec5cfe',
      count: 1,
      title: 'Cry Baby',
      status: 'Official',
      'artist-credit': [
        {
          name: 'Melanie Martinez',
          artist: {
            id: '0df563ec-1a79-486e-a46d-5b9862a40311',
            name: 'Melanie Martinez',
            'sort-name': 'Martinez, Melanie',
          },
        },
      ],
      'release-group': {
        id: '85dd3078-58e9-46fc-b1ae-7d3abfde48c3',
        'type-id': 'f529b476-6e62-324f-b0aa-1f3e33d313fc',
        'primary-type-id': 'f529b476-6e62-324f-b0aa-1f3e33d313fc',
        title: 'Cry Baby',
        'primary-type': 'Album',
      },
      date: '2015-11-11',
      country: 'BR',
      'track-count': 13,
    },
  ],
  isrcs: ['USAT21501779'],
  tags: [
    {
      count: 1,
      name: 'indie pop',
    },
  ],
}

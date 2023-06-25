import axios from 'axios'

import { isNoError } from '../guards'
import { MusicBrainzAnswer } from './types'

export const queryMusicInfo = async (
  query: string,
  limit?: number,
  _offset?: number,
) => {
  const url = new URL('https://musicbrainz.org/ws/2/recording')
  url.searchParams.set('query', `${query}~0.9 AND ${query}~7`)
  url.searchParams.set('limit', (limit ?? 10).toString())
  const data = await axios
    .get(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
    })
    .then(r => r.data as MusicBrainzAnswer)
    .catch(e => {
      // 503 likely
      return { error: 'rateLimit', details: e }
    })

  if (isNoError<MusicBrainzAnswer>(data)) {
    return data
  }

  return {
    recordings: [],
  }
}

if (require.main === module) {
  queryMusicInfo('BONES - LooseScrew', 1).then(console.log)
}

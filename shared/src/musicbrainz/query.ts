import { isNoError } from '../guards'
import { MusicBrainzRecordingSearchAnswer } from './types'
import { mbAxios } from '@sovok/shared/musicbrainz/mbAxios'

export const queryMusicInfo = async (
  query: string,
  limit?: number,
  _offset?: number,
) => {
  const url = new URL('https://musicbrainz.org/ws/2/recording')
  url.searchParams.set('query', `${query}~0.9 AND ${query}~7`)
  url.searchParams.set('limit', (limit ?? 10).toString())
  const data = await mbAxios
    .get(url.toString())
    .then(r => r.data as MusicBrainzRecordingSearchAnswer)
    .catch(e => {
      // 503 likely
      return { error: 'rateLimit', details: e }
    })

  if (isNoError<MusicBrainzRecordingSearchAnswer>(data)) {
    return data
  }

  return {
    recordings: [],
  }
}

if (require.main === module) {
  queryMusicInfo('BONES - LooseScrew', 1).then(console.log)
}

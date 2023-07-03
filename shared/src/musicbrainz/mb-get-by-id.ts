import { isNoError } from '../guards'
import { MBEntityType, MBReturnType } from './types'
import { mbAxios } from '@sovok/shared/musicbrainz/mbAxios'

const excludeOthers = (type: MBEntityType) => {
  if (type === 'recording') return ['artist', 'release']
  return []
}
// (['recording', 'release', 'artist'] as MBEntityType[]).filter(v => v !== type)

export const mbGetById = async <T extends MBEntityType>(
  mbid: string,
  type: MBEntityType = 'recording',
): Promise<MBReturnType<T> | undefined> => {
  const url = new URL(
    `https://musicbrainz.org/ws/2/${type}/${mbid}?inc=${excludeOthers(type)
      .map(v => v + 's')
      .join('+')}`,
  )
  const data = await mbAxios
    .get(url.toString())
    .then(r => r.data as MBReturnType<T>)
    .catch(e => {
      // 503 likely
      return { error: 'rateLimit', details: e }
    })

  if (isNoError<MBReturnType<T>>(data)) {
    return data
  }

  return undefined
}

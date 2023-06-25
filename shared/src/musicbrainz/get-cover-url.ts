import { MBID } from '../models/search/track'

type CoverSize = '250' | '500' | '1200' | 250 | 500 | 1200

const COVER_URL_BASE = 'https://coverartarchive.org/release/'

export const getCoverUrl = (mbid: MBID) => {
  return `${COVER_URL_BASE}${mbid}/front-##`
}

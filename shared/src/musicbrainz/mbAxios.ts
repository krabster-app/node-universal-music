import axios from 'axios'
import {
  MUSICBRAINZ_APPNAME,
  MUSICBRAINZ_APPVERSION,
  MUSICBRAINZ_CONTACT,
} from '@sovok/server/config'

export const mbAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'User-Agent': `${MUSICBRAINZ_APPNAME}/${MUSICBRAINZ_APPVERSION} (${MUSICBRAINZ_CONTACT})`,
  },
})

import { exists } from '@sovok/shared'
import * as process from 'process'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const AWS_ACCESS_KEY = process.env.SOVOK_AWS_ACCESS_KEY

export const AWS_SECRET_KEY = process.env.SOVOK_AWS_SECRET_KEY

export const AWS_SERVER = process.env.SOVOK_AWS_SERVER

export const AWS_BUCKET = process.env.SOVOK_AWS_BUCKET

export const AWS_SSL_ENABLED = process.env.SOVOK_AWS_SSL_ENABLED === 'true'

export const TMP_PATH = process.env.SOVOK_TMP_PATH

if (
  !exists(AWS_ACCESS_KEY) ||
  !exists(AWS_SECRET_KEY) ||
  !exists(AWS_SERVER) ||
  !exists(AWS_BUCKET)
) {
  throw new Error('AWS not configured')
}

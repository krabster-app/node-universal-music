/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SOVOK_AWS_ACCESS_KEY: string
  readonly SOVOK_AWS_SECRET_KEY: string
  readonly SOVOK_AWS_SERVER: string
  readonly SOVOK_AWS_BUCKET: string
  readonly SOVOK_AWS_SSL_ENABLED: string
  readonly SOVOK_TMP_PATH: string

  readonly SOVOK_CDN_BASE_URL: string

  readonly SOVOK_MUSICBRAINZ_APPNAME: string
  readonly SOVOK_MUSICBRAINZ_APPVERSION: string
  readonly SOVOK_MUSICBRAINZ_CONTACT: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv extends ImportMetaEnv {
    NODE_ENV: string
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

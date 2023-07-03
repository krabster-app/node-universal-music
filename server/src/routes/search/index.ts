import { publicProcedure } from '@sovok/server/trpc'
import { SearchInput } from '@sovok/shared/models/search/search'
import { musicBrainzTransformer } from '@sovok/shared/musicbrainz/transformer'
import { queryMusicInfo } from '@sovok/shared/musicbrainz/query'

export const search = publicProcedure
  .input(SearchInput)
  .query(async ({ input: { query } }) => {
    const data = await queryMusicInfo(query, 5)
    return data.recordings.map(musicBrainzTransformer)
  })

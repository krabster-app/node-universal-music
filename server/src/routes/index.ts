import { router } from '@sovok/server/trpc'

import { auth } from './auth'
import { search } from '@sovok/server/routes/search'
import { play } from '@sovok/server/routes/play'

export const mainRouter = router({
  auth: auth,
  search: search,
  play: play,
})

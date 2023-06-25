import { z } from 'zod'

export const PlayInput = z.object({
  mbid: z.string().uuid(),
})

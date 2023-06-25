import { z } from 'zod'

export const SearchInput = z.object({
  query: z.string().min(3),
})

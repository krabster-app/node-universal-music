import type { MainRouter } from '@sovok/server'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<MainRouter>()

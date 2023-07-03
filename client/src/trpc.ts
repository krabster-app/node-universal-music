import type { MainRouter } from '@sovok/server'
import { createSWRProxyHooks } from '@trpc-swr/client'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AUTH_TOKEN_KEY } from '@client/domain/auth.ts'

const payload = {
  links: [
    httpBatchLink({
      url: '/api/trpc',
      headers: () => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)

        if (token)
          return {
            Authorization: `Bearer ${token}`,
          }

        return {}
      },
    }),
  ],
}
//
// export const trpc = createSWRProxyHooks<MainRouter>(payload)
//
// export const trpcClient = trpc.createClient()

export let trpcNative = createTRPCProxyClient()

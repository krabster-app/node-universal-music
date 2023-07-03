import type { MainRouter } from '@sovok/server'
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

export let trpc = createTRPCProxyClient<MainRouter>(payload)

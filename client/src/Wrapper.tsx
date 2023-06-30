import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './trpc'
import { FC, useState } from 'react'
import App from '@sovok/client/App.tsx'
import { httpBatchLink } from '@trpc/client'
import { AUTH_TOKEN_KEY } from './domain/auth'

export const Wrapper: FC<{}> = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
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
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

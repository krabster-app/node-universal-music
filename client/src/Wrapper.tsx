import { trpc, trpcClient } from './trpc'
import { FC } from 'react'
import App from '@sovok/client/App.tsx'

export const Wrapper: FC<{}> = () => {
  return (
    <trpc.Provider client={trpcClient}>
      <App />
    </trpc.Provider>
  )
}

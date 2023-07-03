import { FC } from 'react'
import App from '@sovok/client/App.tsx'
import { PlayerInject } from '@client/components/player/global/PlayerInject.tsx'
import { router } from '@client/router'

const openPlayer = () => router.navigate('/player')

export const Wrapper: FC<{}> = () => {
  return (
    <PlayerInject openPlayer={openPlayer}>
      <App />
    </PlayerInject>
  )
}

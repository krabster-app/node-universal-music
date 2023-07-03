import { FC, PropsWithChildren, useState } from 'react'
import { PlayerContext } from '@client/components/player/global/PlayerContext.ts'
import { PlayerController } from '@client/components/player/global/playerInstance.ts'

export const PlayerInject: FC<
  PropsWithChildren<{ openPlayer: () => Promise<void> }>
> = ({ children, openPlayer }) => {
  const [controller] = useState(new PlayerController(openPlayer))
  return (
    <PlayerContext.Provider value={controller}>
      {children}
    </PlayerContext.Provider>
  )
}

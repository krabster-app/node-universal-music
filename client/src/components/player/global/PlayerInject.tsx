import { playerInstance } from '@client/components/player/global/playerInstance'
import { FC, PropsWithChildren, useEffect } from 'react'
import {
  PlayerContext,
  playerController,
} from '@client/components/player/global/PlayerContext.ts'

export const PlayerInject: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    console.log(playerInstance.readyState)
  }, [])
  return (
    <PlayerContext.Provider value={playerController}>
      {children}
    </PlayerContext.Provider>
  )
}

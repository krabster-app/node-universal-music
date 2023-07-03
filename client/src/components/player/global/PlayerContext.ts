import { PlayerController } from '@client/components/player/global/playerInstance'
import { createContext } from 'react'

export const playerController = new PlayerController()

export const PlayerContext = createContext(playerController)

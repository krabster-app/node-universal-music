import { createContext } from 'react'
import { PlayerController } from '@client/components/player/global/playerInstance.ts'

// @ts-ignore
export const PlayerContext = createContext<PlayerController>(null)

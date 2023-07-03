import { useContext } from 'react'
import { PlayerContext } from '@client/components/player/global/PlayerContext.ts'

export const usePlayer = () => useContext(PlayerContext)

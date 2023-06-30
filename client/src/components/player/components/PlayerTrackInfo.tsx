import { FC } from 'react'
import { UiTicker } from '@sovok/client/components/ui/UiTicker'

export const PlayerTrackInfo: FC<{
  title: string
  artist: string
  album?: string
}> = ({ title, artist }) => (
  <div className='w-full flex flex-col space-y-0.5'>
    <UiTicker text={title} className='text-2xl text-white font-display' />
    <UiTicker text={artist} className='text-sm text-zinc-300' />
  </div>
)

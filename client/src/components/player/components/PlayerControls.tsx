import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

export const PlayerControls: FC<
  PropsWithChildren<{
    isPlaying: boolean
    setPlaying: Dispatch<SetStateAction<boolean>>
  }>
> = ({ isPlaying, setPlaying }) => {
  return (
    <div
      onClick={() => setPlaying(v => !v)}
      className='bg-teal-500 text-white font-bold p-3 rounded-xl w-20 text-center select-none cursor-pointer'
    >
      {isPlaying ? 'Pause' : 'Play'}
    </div>
  )
}

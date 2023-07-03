import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useCurrentTrack } from '@client/stores/currentTrack.store.tsx'
import { usePlayer } from '@client/components/player/global/usePlayer.ts'
import { exists } from '@sovok/shared'

const PLAY_BTN_CLASSNAMES = 'w-6 h-6'

const ControlButton: FC<{
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
  icon: (props: { className?: string }) => JSX.Element | null
}> = ({ onClick, className, icon: Icon }) => {
  return (
    <div
      className={clsx(
        'p-2 select-none cursor-pointer transition-transform active:scale-90',
        className,
      )}
      onClick={onClick}
    >
      <Icon className='h-6 w-6 text-white' />
    </div>
  )
}
export type PlayerCommand = 'nexttrack' | 'previoustrack'

export const PlayerControls: FC<
  PropsWithChildren<{
    isPlaying: boolean
    onCommand: (action: PlayerCommand) => void
  }>
> = ({ isPlaying, onCommand }) => {
  const player = usePlayer()
  const id = useCurrentTrack(state => state.current.id)

  return (
    <div className='w-full flex justify-center items-center space-x-2'>
      <ControlButton
        icon={BackwardIcon}
        onClick={() => onCommand('previoustrack')}
      />
      <div
        onClick={() =>
          isPlaying ? player.pause() : exists(id) ? player.continue() : false
        }
        className={clsx(
          'bg-white text-gray-800 p-3 rounded-full text-center select-none cursor-pointer transition-transform active:scale-95',
          !isPlaying && !exists(id) && 'disabled',
        )}
      >
        {isPlaying ? (
          <PauseIcon className={PLAY_BTN_CLASSNAMES} />
        ) : (
          <PlayIcon
            className={clsx(PLAY_BTN_CLASSNAMES, 'translate-x-[1px]')}
          />
        )}
      </div>
      <ControlButton
        icon={ForwardIcon}
        onClick={() => onCommand('nexttrack')}
      />
    </div>
  )
}

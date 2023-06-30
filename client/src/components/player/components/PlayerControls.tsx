import {
  Dispatch,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
} from 'react'
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'

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
    setPlaying: Dispatch<SetStateAction<boolean>>
    onCommand: (action: PlayerCommand) => void
  }>
> = ({ isPlaying, setPlaying, onCommand }) => {
  return (
    <div className='w-full flex justify-center items-center space-x-2'>
      <ControlButton
        icon={BackwardIcon}
        onClick={() => onCommand('previoustrack')}
      />
      <div
        onClick={() => setPlaying(v => !v)}
        className='bg-white text-gray-800 p-3 rounded-full text-center select-none cursor-pointer transition-transform active:scale-95'
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

import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { secondsFormat } from '@sovok/client/utils/secondsFormat.ts'
import { useEvent } from 'react-use'
import { playerInstance } from '@sovok/client/components/player/global/playerInstance'

export const SeekBar: FC<
  PropsWithChildren<{
    value?: number
    maxValue?: number
    playing: boolean
    onSeekEnd: (value: number) => void
  }>
> = ({ value = 0, maxValue = 0, onSeekEnd, playing }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [msLeft, setMsLeft] = useState(0)
  const [width, setWidth] = useState(0)

  const maxValueSet = useMemo(
    () => maxValue !== undefined && maxValue > 0,
    [maxValue],
  )
  const durationString = useMemo(() => secondsFormat(maxValue), [maxValue])

  const reset = useCallback(() => {
    setMsLeft(Math.floor((maxValue - value) * 1000))
    setWidth((value * 100) / maxValue)
  }, [maxValue, value])

  const seekEnd = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const sliderBounds = trackRef.current?.getBoundingClientRect()
      if (!sliderBounds) return
      let part = (e.clientX - sliderBounds.x) / sliderBounds.width
      if (part < 0.02) part = 0
      const newPosition = Math.floor(maxValue * part * 1000) / 1000
      onSeekEnd(newPosition)
      setMsLeft(Math.floor((maxValue - newPosition) * 1000))
      setWidth((newPosition * 100) / maxValue)
    },
    [trackRef, reset],
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    if (!playing) {
      reset()
    }
  }, [playing, reset])

  useEffect(() => {
    if (width < 100 && playing) {
      const timeout = setTimeout(() => {
        setWidth(100)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [width, playing])

  useEvent(
    'visibilitychange',
    () => {
      console.log('visibility changed')
      if (document.visibilityState === 'visible') {
        reset()
      }
    },
    document,
  )

  return (
    <div className='w-full flex flex-col text-white'>
      <div
        className='relative py-2'
        datatype='seekbar'
        ref={trackRef}
        onClick={seekEnd}
      >
        <div className='relative h-[0.25rem]'>
          <div className='absolute top-0 left-0 h-[0.25rem] w-full bg-zinc-800 rounded-sm'></div>
          {maxValueSet ? (
            <>
              <div
                className='absolute top-0 left-0 h-[0.25rem] bg-zinc-500 rounded-sm'
                style={{
                  width: `${
                    playerInstance.buffered.length > 0
                      ? (
                          (playerInstance.buffered.end(0) * 100) /
                          playerInstance.duration
                        ).toFixed(2)
                      : 0
                  }%`,
                }}
              />
              <div
                className='absolute top-0 left-0 h-[0.25rem] bg-zinc-100 rounded-sm'
                ref={progressRef}
                style={{
                  width: `${width}%`,
                  transition:
                    playing && width === 100
                      ? `width ${msLeft}ms linear`
                      : 'none',
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      <div className='w-full flex justify-between text-xs'>
        <span>{maxValueSet ? secondsFormat(value) : '-:--'}</span>
        <span>{maxValueSet ? durationString : '-:--'}</span>
      </div>
    </div>
  )
}

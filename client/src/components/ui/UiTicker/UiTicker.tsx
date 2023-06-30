import clsx from 'clsx'
import {
  CSSProperties,
  FC,
  HTMLAttributes,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import style from './UiTicker.module.css'
import { exists } from '@sovok/shared/guards'

const ANIMATION_DURATION = 30

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback: ResizeObserverCallback,
) => {
  useEffect(() => {
    if (!exists(ref.current)) return

    const observer = new ResizeObserver((...args) => {
      callback(...args)
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, callback])
}

export type UiTickerProps = {
  text: string
} & HTMLAttributes<HTMLDivElement>

export const UiTicker: FC<UiTickerProps> = ({ text, className }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  const [isOverflowing, setIsOverflowing] = useState(false)
  const [duration, setDuration] = useState(0)

  const update = useCallback(() => {
    const rootWidth = rootRef.current?.getBoundingClientRect().width ?? 0
    const innerRawWidth = innerRef.current?.getBoundingClientRect().width ?? 0
    const innerWidth = innerRawWidth / (isOverflowing ? 2 : 1)

    setIsOverflowing(innerWidth > rootWidth)
    setDuration(innerWidth * ANIMATION_DURATION)
  }, [rootRef, innerRef, isOverflowing])

  const innerStyle = useMemo(
    () =>
      ({
        '--ui-overflowing-text-duration': `${duration}ms`,
      } as CSSProperties),
    [duration],
  )

  useEffect(update, [text])
  useResizeObserver(rootRef, update)

  return (
    <div
      ref={rootRef}
      className={clsx(
        'overflow-hidden select-none cursor-auto',
        isOverflowing && 'fade-right-16',
        className,
      )}
    >
      <span
        ref={innerRef}
        className={clsx(
          'inline-block whitespace-nowrap',
          isOverflowing && style.overflowingText,
        )}
        style={innerStyle}
        data-overflowing-text={text}
      >
        {text}
      </span>
    </div>
  )
}

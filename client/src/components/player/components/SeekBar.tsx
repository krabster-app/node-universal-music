import { FC, PropsWithChildren, useRef, useState } from 'react'

export const SeekBar: FC<
  PropsWithChildren<{
    initialPosition: number
    maxValue: number
    onSeek: (value: number) => void
    onSeekEnd: (value: number) => void
  }>
> = ({ initialPosition = 0, maxValue, onSeek, onSeekEnd }) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const progressRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className='text-white relative  py-2'
      datatype='seekbar'
      ref={trackRef}
      onClick={e => {
        const brects = trackRef.current?.getBoundingClientRect()
        if (!brects) return
        let part = (e.clientX - brects.x) / brects.width
        if (part < 0.02) part = 0
        console.log(e.clientX - brects.x, brects.width, part * 100)
        const newWidth = (part * 100).toFixed(4)
        progressRef.current!.style.width = `${newWidth}%`
        onSeekEnd(maxValue * part)
      }}
    >
      <div className='relative h-[0.25rem]'>
        <div className='absolute top-0 left-0 h-[0.25rem] w-full bg-white/30 rounded-sm'></div>
        <div className='absolute top-0 left-0 h-[0.25rem] w-[89%] bg-white/50 rounded-sm'></div>
        <div
          className='absolute top-0 left-0 h-[0.25rem] bg-white rounded-sm'
          ref={progressRef}
        ></div>
      </div>
    </div>
  )
}

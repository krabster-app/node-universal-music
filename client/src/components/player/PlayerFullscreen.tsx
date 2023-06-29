import { SeekBar } from '@sovok/client/components/player/components/SeekBar.tsx'

export const PlayerFullscreen = () => {
  return (
    <div className='w-[21.6rem] h-[38.4rem] bg-black p-4'>
      <div className='flex flex-col w-full space-y-4'>
        <SeekBar
          initialPosition={13}
          maxValue={206}
          onSeek={v => console.log(v)}
          onSeekEnd={v => console.log('end', v)}
        />
      </div>
    </div>
  )
}

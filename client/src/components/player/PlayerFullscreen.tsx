import { useEffect, useMemo, useState } from 'react'
import { useEvent, useInterval } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { playerInstance } from '@sovok/client/components/player/global/playerInstance.ts'
import { SeekBar } from '@sovok/client/components/player/components/SeekBar.tsx'
import { PlayerControls } from '@sovok/client/components/player/components/PlayerControls.tsx'
import { PlayerTrackInfo } from '@sovok/client/components/player/components/PlayerTrackInfo.tsx'
import { PlayerCover } from '@sovok/client/components/player/components/PlayerCover.tsx'
import {
  useCurrentTrack,
  usePlayerState,
} from '@sovok/client/stores/currentTrack.store.tsx'
import { padLeft } from '@client/utils/padLeft.ts'
import { getImageAvg } from '@sovok/client/utils/getImageAvg.ts'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const STEP_S = 0.2
const SHADOWING_K = 0.3

export const PlayerFullscreen = () => {
  const [slideValue, setSlideValue] = useState(0)
  const { trackLength, isPlaying } = usePlayerState(state => ({
    trackLength: state.current.trackLength,
    isPlaying: state.current.isPlaying,
  }))

  const { title, artist, coverUrl } = useCurrentTrack(state => ({
    title: state.current.title || '',
    artist: state.current.artistFull || '',
    coverUrl: state.current.coverUrl || 'https://via.placeholder.com/192',
  }))

  useInterval(
    () => {
      setSlideValue(() => {
        return Math.floor(playerInstance.currentTime)
      })
    },
    isPlaying ? STEP_S * 1000 : null,
  )

  useEvent(
    'pause',
    () => {
      setSlideValue(playerInstance.currentTime)
    },
    playerInstance,
  )

  const [coverAvgColor, setCoverAvgColor] = useState('#000000')

  useEffect(() => {
    getImageAvg(coverUrl)
      .then(r => {
        console.log(r)
        const futureColor = `#${padLeft(
          Math.floor(r.r * SHADOWING_K).toString(16),
          '0',
          2,
        )}${padLeft(
          Math.floor(r.g * SHADOWING_K).toString(16),
          '0',
          2,
        )}${padLeft(Math.floor(r.b * SHADOWING_K).toString(16), '0', 2)}`
        console.log(futureColor)
        setCoverAvgColor(futureColor)
      })
      .catch(() => {
        setCoverAvgColor('#000')
      })
  }, []) // image

  const computedCoverUrl = useMemo(
    () => coverUrl.replace('##', '250'),
    [coverUrl],
  )

  const navigate = useNavigate()

  return (
    <div
      className='w-[21.6rem] h-[38.4rem] px-2 py-4 relative'
      style={{ backgroundColor: coverAvgColor }}
    >
      <img
        src={computedCoverUrl}
        className='absolute object-cover top-0 left-0 w-full h-full blur-md contrast-50 brightness-50 opacity-50'
      />
      <div className='relative flex flex-col h-full pb-8 w-full space-y-4 items-center justify-between'>
        <div className='w-full px-2 flex justify-between items-center cursor-pointer select-none'>
          <div className='p-2' onClick={() => navigate('/search')}>
            <ArrowLeftIcon className='w-6 h-6 text-white' />
          </div>
          <span className='text-zinc-300 font-regular text-xs'>
            Playing "{artist}"
          </span>
        </div>
        <div className='flex flex-col w-full px-4 space-y-4 items-center'>
          <PlayerCover url={coverUrl} className='drop-shadow-lg' />
        </div>
        <div className='flex flex-col w-full px-4 space-y-2 items-center'>
          <PlayerTrackInfo title={title} artist={artist} />
          <SeekBar
            value={slideValue}
            maxValue={trackLength}
            onSeekEnd={v => {
              playerInstance.currentTime = v
            }}
            playing={isPlaying}
          />
          <PlayerControls
            isPlaying={isPlaying}
            onCommand={command => {
              console.log('command', command)
            }}
          />
        </div>
      </div>
    </div>
  )
}

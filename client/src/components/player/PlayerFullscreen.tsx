import { SeekBar } from '@sovok/client/components/player/components/SeekBar.tsx'
import { useEffect, useState } from 'react'
import { useEvent, useInterval } from 'react-use'
import { playerInstance } from '@sovok/client/components/player/global/playerInstance.ts'
import { PlayerControls } from '@sovok/client/components/player/components/PlayerControls.tsx'
import { PlayerTrackInfo } from '@sovok/client/components/player/components/PlayerTrackInfo.tsx'
import { PlayerCover } from '@sovok/client/components/player/components/PlayerCover.tsx'

import { getImageAvg } from '@sovok/client/utils/getImageAvg.ts'
import { useCurrentTrack } from '@sovok/client/stores/currentTrack.store.tsx'

const STEP_S = 0.2
const SHADOWING_K = 0.3

export const PlayerFullscreen = () => {
  const [slideValue, setSlideValue] = useState(40)
  const [isPlaying, setPlaying] = useState(!playerInstance.paused)
  const [trackLength, setTrackLength] = useState(137)
  const { title, artist, coverUrl } = useCurrentTrack(state => ({
    title: state.current.title || 'Waiting...',
    artist: state.current.artistFull || 'Waiting...',
    coverUrl: state.current.coverUrl || 'https://via.placeholder.com/192',
  }))

  useInterval(
    () => {
      setSlideValue(() => {
        const current = playerInstance.currentTime
        if (current >= trackLength) setPlaying(false)
        return Math.floor(current)
      })
    },
    isPlaying ? STEP_S * 1000 : null,
  )

  console.log('player render')

  useEffect(() => {
    // playerInstance.src =
    //   'http://m3s.talkiiing.ru/d457c735-62f4-4cd4-a91b-88de7f684df2'
    playerInstance.src = 'http://localhost:9000/audio.webm'
  }, [])

  useEvent(
    'loadedmetadata',
    () => {
      console.log('loaded meta')
      setTrackLength(playerInstance.duration)
      setSlideValue(0)
    },
    playerInstance,
  )

  useEvent(
    'ended',
    () => {
      console.log('ended')
      setPlaying(false)
      playerInstance.currentTime = 0
      setSlideValue(0)
    },
    playerInstance,
  )

  useEvent(
    'canplaythrough',
    () => {
      console.log('fully loaded')
    },
    playerInstance,
  )

  useEvent(
    'play',
    () => {
      setPlaying(true)
    },
    playerInstance,
  )

  useEvent(
    'pause',
    () => {
      setPlaying(false)
    },
    playerInstance,
  )

  useEffect(() => {
    if (isPlaying) {
      playerInstance.play()
    } else {
      playerInstance.pause()
      setSlideValue(playerInstance.currentTime)
    }
  }, [isPlaying])

  const [coverAvgColor, setCoverAvgColor] = useState('#000000')

  useEffect(() => {
    getImageAvg(coverUrl).then(r => {
      console.log(r)
      setCoverAvgColor(
        `#${Math.floor(r.r * SHADOWING_K).toString(16)}${Math.floor(
          r.g * SHADOWING_K,
        ).toString(16)}${Math.floor(r.b * SHADOWING_K).toString(16)}`,
      )
    })
  }, []) // image

  return (
    <div
      className='w-[21.6rem] h-[38.4rem] px-2 py-4 relative'
      style={{ backgroundColor: coverAvgColor }}
    >
      <img
        src={coverUrl}
        className='absolute object-cover top-0 left-0 w-full h-full blur-md contrast-50 brightness-50 opacity-50'
      />
      <div className='relative flex flex-col h-full pb-8 w-full space-y-4 items-center justify-between'>
        <div className='text-center'>
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
              console.log('end', v, 'current', playerInstance.currentTime)
              playerInstance.currentTime = v
            }}
            playing={isPlaying}
          />
          <PlayerControls
            isPlaying={isPlaying}
            setPlaying={setPlaying}
            onCommand={command => {
              console.log('command', command)
            }}
          />
        </div>
      </div>
    </div>
  )
}

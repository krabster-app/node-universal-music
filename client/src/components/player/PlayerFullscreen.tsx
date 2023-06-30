import { SeekBar } from '@sovok/client/components/player/components/SeekBar.tsx'
import { useCallback, useEffect, useState } from 'react'
import { useEvent, useInterval } from 'react-use'
import { playerInstance } from '@sovok/client/components/player/global/playerInstance.tsx'
import { PlayerControls } from '@sovok/client/components/player/components/PlayerControls.tsx'

// document.body.appendChild(playerInstance)
// playerInstance.src = '/ignored/audio.webm'
console.log(playerInstance)

document.addEventListener('keypress', ({ key }) => console.log('pressed', key))

const STEP_S = 0.2

export const PlayerFullscreen = () => {
  const [slideValue, setSlideValue] = useState(40)
  const [isPlaying, setPlaying] = useState(!playerInstance.paused)

  const [trackLength, setTrackLength] = useState(137)

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
    onNewSource()
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

  const onNewSource = useCallback(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'HDMI',
        artist: 'BONES',
        album: 'Racoon',
        artwork: [
          {
            src: 'https://via.placeholder.com/96',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'https://via.placeholder.com/128',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'https://via.placeholder.com/192',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      })

      navigator.mediaSession.setActionHandler('nexttrack', () =>
        console.log('next track wanted'),
      )

      navigator.mediaSession.setActionHandler('previoustrack', () =>
        console.log('prev track wanted'),
      )

      navigator.mediaSession.setActionHandler('seekto', e =>
        console.log('seek', e.seekTime),
      )
      // TODO: Update playback state.
    }
  }, [])

  return (
    <div className='w-[21.6rem] h-[38.4rem] bg-black p-4'>
      <div className='flex flex-col w-full space-y-4 items-center'>
        <SeekBar
          value={slideValue}
          maxValue={trackLength}
          onSeekEnd={v => {
            console.log('end', v, 'current', playerInstance.currentTime)
            playerInstance.currentTime = v
          }}
          playing={isPlaying}
        />
        <PlayerControls isPlaying={isPlaying} setPlaying={setPlaying} />
      </div>
    </div>
  )
}

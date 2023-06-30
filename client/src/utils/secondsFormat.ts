import { padLeft } from '@sovok/client/utils/padLeft.ts'

export const secondsFormat = (_seconds: number) => {
  const hours = Math.floor(_seconds / 3600)
  const minutes = Math.floor(_seconds / 60) - hours * 60
  const seconds = Math.floor(_seconds - minutes * 60 - hours * 3600)
  return `${
    hours > 0 ? `${hours}:${padLeft(minutes, '0', 2)}` : `${minutes}`
  }:${padLeft(seconds, '0', 2)}`
}

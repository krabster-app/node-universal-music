import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'

export const ytdlDownload = async (videoId: string) => {
  console.log(`[WORKER] Downloading ${videoId}`)
  await ytdl(videoId, {
    quality: 'highestaudio',
  }).pipe(createWriteStream(`./${videoId}.webm`))

  return { id: videoId }
}

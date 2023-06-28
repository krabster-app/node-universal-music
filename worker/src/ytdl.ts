import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'

export const ytdlDownload = async (videoId: string, pathToWrite: string) => {
  await mkdir(pathToWrite.substring(0, pathToWrite.lastIndexOf('/')), {
    recursive: true,
  })
  console.log(`[WORKER] Downloading ${videoId} to ${pathToWrite})`)

  await new Promise(resolve => {
    ytdl(videoId, {
      quality: 'highestaudio',
    })
      .pipe(createWriteStream(pathToWrite))
      .once('close', resolve)
  })

  return { id: videoId }
}

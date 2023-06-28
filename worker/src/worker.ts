import path from 'path'
import {
  InputMessage,
  InputMessageKind,
  OutputMessage,
  OutputMessageKind,
} from '@sovok/shared/models/download/worker-messages'
import { MessagePassingInterface } from '@sovok/shared'
import { parentPort } from 'worker_threads'
import { uploadTrack } from '@sovok/server/utils/s3/s3'
import { TMP_PATH } from '@sovok/server/config'
import { ytdlDownload } from '@sovok/worker/ytdl'

console.log('[WORKER] Worker started')

// console.log('self:', self)
// console.log('globalThis:', globalThis)
// console.log('global:', global)
// console.log('this:', this)

declare const globalThis: DedicatedWorkerGlobalScope

const mpi = new MessagePassingInterface<OutputMessage, InputMessage>(
  parentPort!,
)

mpi.listen(async message => {
  console.log('[WORKER] Received message', message)

  switch (message.type) {
    case InputMessageKind.DownloadTask: {
      console.log(`[WORKER] Downloading ${message.task.id}`)
      const fileTmpPath = path.resolve(
        TMP_PATH ?? './tmp',
        message.task.task.info.videoId,
      )
      const s3Key = `${message.task.task.mbid}`

      await ytdlDownload(message.task.task.info.videoId, fileTmpPath)

      const uploaded = await uploadTrack(
        fileTmpPath,
        s3Key,
        message.task.task.meta,
      )

      mpi.send({
        type: OutputMessageKind.DownloadSuccess,
        id: message.task.id,
        download: {
          id: uploaded.key,
          serverId: uploaded.location,
        },
      })
    }
  }
})

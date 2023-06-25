import {
  InputMessage,
  InputMessageKind,
  OutputMessage,
  OutputMessageKind,
} from '@sovok/shared/models/download/worker-messages'
import { MessagePassingInterface } from '@sovok/shared'
import { ytdlDownload } from './ytdl'
import { parentPort } from 'worker_threads'

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

      const result = await ytdlDownload(message.task.task.info.videoId)
      mpi.send({
        type: OutputMessageKind.DownloadSuccess,
        id: message.task.id,
        download: {
          id: result.id,
          serverId: '',
        },
      })
    }
  }
})

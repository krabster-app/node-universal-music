import { Worker } from 'worker_threads'
import { MessagePassingInterface } from '@sovok/shared'
import { resolve } from 'path'
import { IS_DEV } from './config'
import {
  InputMessage,
  OutputMessage,
} from '@sovok/shared/models/download/worker-messages'

const WORKER_PATH = resolve(
  __dirname,
  IS_DEV ? '../../worker/src/worker.ts' : '../worker/worker.js',
)

const worker = new Worker(WORKER_PATH)

export const mpi = new MessagePassingInterface<InputMessage, OutputMessage>(
  worker,
)

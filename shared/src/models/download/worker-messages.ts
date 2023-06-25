import { DownloadTask, DownloadTaskId } from './download-task'
import { Download } from './download'
import { YouTubeError } from './youtube'

export const enum InputMessageKind {
  DownloadTask = 'DownloadTask',
}

export type InputMessage = {
  type: InputMessageKind.DownloadTask
  task: DownloadTask
}

export const enum DownloadErrorKind {
  YouTube = 'YouTube',
}

export type DownloadError = {
  type: DownloadErrorKind.YouTube
  error: YouTubeError
}

export const enum OutputMessageKind {
  DownloadStart = 'DownloadStart',
  DownloadSuccess = 'DownloadSuccess',
  DownloadError = 'DownloadError',
}

export type OutputMessage =
  | { type: OutputMessageKind.DownloadStart; id: DownloadTaskId }
  | {
      type: OutputMessageKind.DownloadSuccess
      id: DownloadTaskId
      download: Download
    }
  | {
      type: OutputMessageKind.DownloadError
      id: DownloadTaskId
      error: DownloadError
    }

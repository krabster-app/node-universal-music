import { MediaSource } from '../media-source'
import { YouTubeDownloadTaskInfo } from './youtube'

export type DownloadTaskInfo = {
  source: MediaSource.YouTube
  info: YouTubeDownloadTaskInfo
} // TODO: add more when needed

export type DownloadTaskId = string

export type DownloadTask = {
  id: DownloadTaskId
  task: DownloadTaskInfo
}

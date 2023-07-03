import { MediaSource } from '../media-source'
import { YouTubeDownloadTaskInfo } from './youtube'
import { MBID } from '@sovok/shared/models/search/track'

export type S3Metadata = {
  title: string
  artist: string
  platform: MediaSource | string
}

export type DownloadTaskInfo = {
  source: MediaSource.YouTube
  info: YouTubeDownloadTaskInfo
  mbid: MBID
  meta: S3Metadata
} // TODO: add more when needed

export type DownloadTaskId = string

export type DownloadTask = {
  id: DownloadTaskId
  task: DownloadTaskInfo
}

export type YouTubeDownloadTaskInfo = {
  videoId: string
}

export const enum YouTubeErrorKind {
  VideoNotFound,
  VideoUnavailable,
  Other,
}

export type YouTubeError =
  | { type: YouTubeErrorKind.VideoNotFound }
  | { type: YouTubeErrorKind.VideoUnavailable }
  | { type: YouTubeErrorKind.Other; error: Error }

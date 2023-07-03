import { TrackInfo } from '@sovok/shared/models/search/track'
import { prisma } from '@sovok/server/prisma'
import { Platform } from '@prisma/client'
import { TrackSource } from '@sovok/shared/models/media-source'

type TrackOnPlatform = { key: string; platform: TrackSource }

export const connectTrackToDownloaded = async (
  trackId: TrackInfo['id'],
  meta: TrackOnPlatform,
) => {
  const insertTrackOnPlatform = prisma.trackOnPlatform.create({
    data: {
      trackInfoId: trackId,
      platform: meta.platform as Platform,
      key: meta.key,
      meta: {},
    },
    select: {
      key: true,
    },
  })

  return (await prisma.$transaction([insertTrackOnPlatform]))[0]
}

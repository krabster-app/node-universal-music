import { TrackInfo } from '@sovok/shared/models/search/track'
import { prisma } from '@sovok/server/prisma'

export const getTrackById = (trackId: TrackInfo['id']) => {
  return prisma.trackInfo.findFirst({
    select: {
      id: true,
      title: true,
      disambiguation: true,
      coverUrl: true,

      artistsMap: {
        select: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
          prefix: true,
        },
      },
      releaseMap: {
        include: {
          release: true,
        },
      },
      trackOnPlatform: {
        select: {
          platform: true,
          key: true,
        },
      },
    },
    where: {
      id: trackId,
    },
  })
}

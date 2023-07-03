import { TrackInfo } from '@sovok/shared/models/search/track'
import { prisma } from '@sovok/server/prisma'
import { exists } from '@sovok/shared'

export const cacheTrack = async (track: TrackInfo) => {
  const insertArtists = prisma.artistInfo.createMany({
    data: track.artists.map(a => a.artist),
    skipDuplicates: true,
  })

  const insertReleases = prisma.releaseInfo.createMany({
    data: track.release ? [track.release] : [],
    skipDuplicates: true,
  })

  const cleanTrack = {
    ...track,
    artists: undefined,
    release: undefined,
    artistsMap: track.artists,
    releaseMap: track.release,
  }

  delete cleanTrack.artists
  delete cleanTrack.release

  const insertTrack = prisma.trackInfo.create({
    data: {
      ...cleanTrack,
      artistsMap: {
        createMany: {
          data: cleanTrack.artistsMap.map((a, i, arr) => ({
            artistId: a.artist.id,
            prefix: i > 0 ? arr[i - 1].joinphrase : undefined,
          })),
        },
      },
      releaseMap: {
        createMany: {
          data: exists(cleanTrack.releaseMap?.id)
            ? [
                {
                  releaseId: cleanTrack.releaseMap!.id,
                },
              ]
            : [],
        },
      },
    },
    select: {
      id: true,
      title: true,
      artistsMap: {
        select: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      releaseMap: {
        select: {
          release: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      },
      createdAt: false,
      updatedAt: false,
    },
  })

  return (
    await prisma.$transaction([insertArtists, insertReleases, insertTrack])
  )[2]
}

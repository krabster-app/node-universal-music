/*
  Warnings:

  - You are about to drop the column `releaseId` on the `TrackInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackId,artistId]` on the table `TrackToArtist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId,playlistId]` on the table `TrackToPlaylist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TrackInfo" DROP CONSTRAINT "TrackInfo_releaseId_fkey";

-- AlterTable
ALTER TABLE "TrackInfo" DROP COLUMN "releaseId";

-- CreateTable
CREATE TABLE "TrackToRelease" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "releaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackToRelease_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackToRelease_trackId_releaseId_key" ON "TrackToRelease"("trackId", "releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackToArtist_trackId_artistId_key" ON "TrackToArtist"("trackId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackToPlaylist_trackId_playlistId_key" ON "TrackToPlaylist"("trackId", "playlistId");

-- AddForeignKey
ALTER TABLE "TrackToRelease" ADD CONSTRAINT "TrackToRelease_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackToRelease" ADD CONSTRAINT "TrackToRelease_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "ReleaseInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

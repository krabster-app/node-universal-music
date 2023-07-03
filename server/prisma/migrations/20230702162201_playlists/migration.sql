-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Youtube', 'Yandex', 'VK');

-- CreateTable
CREATE TABLE "TrackInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "disambiguation" TEXT,
    "artistFull" TEXT NOT NULL,
    "coverUrl" TEXT,
    "releaseId" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtistInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackToArtist" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackToArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "disambiguation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackOnPlatform" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "trackInfoId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "TrackOnPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackToPlaylist" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackToPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackOnPlatform_platform_trackInfoId_key" ON "TrackOnPlatform"("platform", "trackInfoId");

-- AddForeignKey
ALTER TABLE "TrackInfo" ADD CONSTRAINT "TrackInfo_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "ReleaseInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackToArtist" ADD CONSTRAINT "TrackToArtist_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackToArtist" ADD CONSTRAINT "TrackToArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ArtistInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackOnPlatform" ADD CONSTRAINT "TrackOnPlatform_trackInfoId_fkey" FOREIGN KEY ("trackInfoId") REFERENCES "TrackInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackToPlaylist" ADD CONSTRAINT "TrackToPlaylist_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackToPlaylist" ADD CONSTRAINT "TrackToPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

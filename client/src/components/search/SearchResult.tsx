import { FC, HTMLAttributes } from 'react'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'
import { SearchResultCover } from '@client/components/search/SearchResultCover.tsx'
import { exists } from '@sovok/shared'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

export const SearchResult: FC<TrackInfo & HTMLAttributes<HTMLDivElement>> = ({
  title,
  artistFull,
  coverUrl,
  release,
  id,
  onClick,
}) => {
  return (
    <div
      className='w-full flex items-center animate-fade-in select-none cursor-pointer wire'
      onClick={e => {
        console.log('play request ', id)
        onClick?.(e)
        e.stopPropagation()
      }}
    >
      <div className='p-2 shrink-0'>
        <SearchResultCover url={coverUrl} className='h-12 w-12' />
      </div>
      <div className='flex-grow w-full h-full flex flex-col justify-center p-2 font-display font-regular overflow-x-clip'>
        <p className='text-primary-content text-md leading-6 truncate'>
          {title}
        </p>
        <p className='text-base-content text-sm leading-5 truncate'>
          {artistFull}
          {exists(release) ? ` • ${release.title}` : ''}
        </p>
      </div>
      <div
        className='shrink-0 flex items-center h-full pl-2 pr-4 py-4 '
        onClick={e => {
          console.log('options for ', id)
          e.stopPropagation()
        }}
      >
        <EllipsisHorizontalIcon className='text-base-content h-6 w-6' />
      </div>
    </div>
  )
}

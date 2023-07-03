import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

const COVER_PLACEHOLDER = 'https://via.placeholder.com/##'

export const SearchResultCover: FC<
  {
    url?: string | null
  } & HTMLAttributes<HTMLImageElement>
> = ({ url, className }) => (
  <img
    className={clsx('w-full aspect-square select-none', className)}
    draggable={false}
    src={(url ?? COVER_PLACEHOLDER).replace('##', '250')}
    onError={e => {
      const target = e.currentTarget
      target.style.opacity = '0'
      target.onload = () => (target.style.opacity = '1')
      target.src = COVER_PLACEHOLDER.replace('##', '250')
      e.stopPropagation()
    }}
  />
)

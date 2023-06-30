import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

export const PlayerCover: FC<
  {
    url: string
  } & HTMLAttributes<HTMLImageElement>
> = ({ url, className }) => (
  <img
    className={clsx('w-full aspect-square select-none', className)}
    draggable={false}
    src={url}
  />
)

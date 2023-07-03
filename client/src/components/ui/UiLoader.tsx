import { ReactComponent as LoadIcon } from '@client/assets/icons/loader.svg'
import clsx from 'clsx'

export const UiLoader = ({ className }: { className?: string }) => (
  <LoadIcon className={clsx('animate-fade-in', className)} />
)

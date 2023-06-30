import { FC, PropsWithChildren } from 'react'

export const BaseTypography: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className='prose prose-blue dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl'>
    {children}
  </div>
)

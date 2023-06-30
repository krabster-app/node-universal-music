import { createBrowserRouter } from 'react-router-dom'
import { PlayerFullscreen } from '@sovok/client/components/player/PlayerFullscreen.tsx'
import { BaseLayout } from '@sovok/client/layouts/BaseLayout.tsx'
import { SearchPage } from '@sovok/client/views/search/SearchPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <p>HAHAHAHAHAHHA</p>,
        children: [],
      },
      {
        path: 'search',
        element: <SearchPage />,
        children: [],
      },
    ],
  },
  {
    path: '/player',
    element: <PlayerFullscreen />,
  },
])

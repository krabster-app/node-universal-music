import { RouterProvider } from 'react-router-dom'
import { router } from '@sovok/client/router'
import { PlayerInject } from '@client/components/player/global/PlayerInject.tsx'

const App = () => {
  return (
    <div className='p-4 w-full h-full'>
      <PlayerInject>
        <RouterProvider router={router} />
      </PlayerInject>
    </div>
  )
}

export default App

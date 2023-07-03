import { RouterProvider } from 'react-router-dom'
import { router } from '@sovok/client/router'

const App = () => {
  return (
    <div className='p-4 w-full h-full'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

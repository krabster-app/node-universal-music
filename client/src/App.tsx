import { RouterProvider } from 'react-router-dom'
import { router } from '@sovok/client/router'

const App = () => {
  return (
    <div className='p-4'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

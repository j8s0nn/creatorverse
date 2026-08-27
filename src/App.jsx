import './App.css'

import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "/creators/new",
      element: <AddCreator />
    },
    {
      path: "creators/:id",
      element: <ViewCreator/>
    },
    {
      path: "creators/:id/edit",
      element: <EditCreator/>
    }
  ])

  return element;
  
  
}

export default App

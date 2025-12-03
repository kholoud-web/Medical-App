import { createBrowserRouter } from 'react-router-dom';
import './App.css'
import Appointments from './Pages/Doctor/Appointments/Appointments';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router';
import NotFound from './Pages/NotFound/NotFound';
import Dashboard from './Pages/Doctor/Dashboard';

function App() {
  const route =createBrowserRouter([
    {
      path:"/",element:<Layout/>,
      children:[
        {
          path:"appointments",element:<Appointments/>
        },
        {
          path:"dashboard",element:<Dashboard/>
        },
        {
          path:"*",element:<NotFound/>
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={route}/>

</>
  );
}

export default App

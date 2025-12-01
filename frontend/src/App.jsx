import { createBrowserRouter } from 'react-router-dom';
import './App.css'
import Appointments from './Pages/Doctor/Appointments/Appointments';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const route =createBrowserRouter([
    {
      path:"/",element:<Layout/>,
      children:[
        {
          path:"appointments",element:<Appointments/>
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

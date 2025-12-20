import { createBrowserRouter } from 'react-router-dom';
import './App.css'
import Appointments from './Pages/Doctor/Appointments/Appointments';
import Layout from './Layouts/Layout';
import { RouterProvider } from 'react-router';
import NotFound from './Pages/NotFound/NotFound';
import Dashboard from './Pages/Doctor/Dashboard';
import Treatment from './Pages/Doctor/Treatment/treatment';
import DiagnosisAssistant from './Pages/Doctor/Diagnosis/DiagnosisAssistant';
// import Diagnosis from './Pages/Doctor/Diagnosis/diagnosis';
import DrugChecker from './Pages/Doctor/DrugChecker/DrugChecker';
import MyPatients from './Pages/Doctor/MyPatients/MyPatients';
import PatientProfile from './Pages/Doctor/PatientProfile/PatientProfile';
import CustomerLayout from './Layouts/CustomerLayout';


////////////////////////////////////////////////// Customer Layout/////////////////////
import FindDoctor from './Pages/Customers/FindDoctor/FindDoctor'


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
        {path:"diagnosis", element:<DiagnosisAssistant/>},
        {
           path: "treatment",element: <Treatment />
},
{ path: "/patient-profile", element: <PatientProfile/> },
{
  path:"/my-patients", element:<MyPatients/>
},

        
        {
          path:"/DrugChecker" , element:<DrugChecker/>
        },
        {
          path:"*",element:<NotFound/>
        }
      ]
    },
     {
      path: "/customer",
      element: <CustomerLayout />,
      children: [
        { path: "find-doctor", element: <FindDoctor /> },
      ],
    },
  ])

  return (
    <>
    <RouterProvider router={route}/>

</>
  );
}

export default App

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
// import DrugChecker from './Pages/Doctor/DrugChecker/DrugChecker';
import MyPatients from './Pages/Doctor/MyPatients/MyPatients';
import Reports from './Pages/Doctor/Reports/Reports';
import Notifications from './Pages/Doctor/Notifications/Notifications';
import NotificationCenter from './Pages/Admin/NotificationCenter/NotificationCenter';
import DrugChecker from './Pages/Admin/DrugChecker/DrugChecker';

function App() {
  const role= "admin"
//   const route =createBrowserRouter([
//     {
//       path:"/",element:<Layout/>,
//       children:[
//         {
//           path:"appointments",element:<Appointments/>
//         },
//         {
//           path:"dashboard",element:<Dashboard/>
//         },
//         {path:"diagnosis", element:<DiagnosisAssistant/>},
//         {
//            path: "treatment",element: <Treatment />
// },
// // { path: "diagnosis", element: <Diagnosis/> },
// {
//   path:"/my-patients", element:<MyPatients/>
// },

        
//         {
//           path:"/DrugChecker" , element:<DrugChecker/>
//         },
//         {
//          path:"/reports", element:<Reports/>
//         },
//          {
//          path:"/notifications", element:<Notifications/>
//         },
//         {
//           path:"*",element:<NotFound/>
//         }
//       ]
//     }
//   ])

const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // doctor Routes
        ...(role === "doctor"
          ? [
              { path: "appointments", element: <Appointments /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "diagnosis", element: <DiagnosisAssistant /> },
              { path: "treatment", element: <Treatment /> },
              { path: "my-patients", element: <MyPatients /> },
              // { path: "DrugChecker", element: <DrugChecker /> },
              { path: "reports", element: <Reports /> },
              { path: "notifications", element: <Notifications /> },
            ]
            // admin routes
          : role === "admin" ? [
             { path: "notificationCenter", element: <NotificationCenter/> },
             {path:"drugChecker",element:<DrugChecker/>}


          ] :[]), 

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);


  return (
    <>
    <RouterProvider router={route}/>

</>
  );
}

export default App

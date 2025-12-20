import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Appointments from "./Pages/Doctor/Appointments/Appointments";
import Layout from "./Layouts/Layout";
import { RouterProvider } from "react-router";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/Doctor/Dashboard";
import Treatment from "./Pages/Doctor/Treatment/treatment";
import AiDiagnosisResult from "./Pages/Patient/AiDiagnosisResult";
import Directory from "./Pages/Patient/Directory";
import Payment from "./Pages/Patient/Payment";
<<<<<<< HEAD
<<<<<<< HEAD
import Service from "./Pages/Service/Service";
import LandingPage from "./Pages/Common/LandingPage/LandingPage";
import MainLayout from "./Layouts/MainLayout";
import HelpSupport from './Pages/Doctor/HelpAndSupport/HelpSupport';

function App() {
  const role = "doctor"; 

  const router = createBrowserRouter([
    { path: "landing", element: <LandingPage /> },
      {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "services", element: <Service /> },
    ],
  },
=======
import Settings from "./Pages/Patient/Settings";
import { LocaleProvider } from "./context/LocaleContext";

function App() {
  const route = createBrowserRouter([
>>>>>>> 32831a2 (Settings Pages done & update Pages)
=======
import Settings from "./Pages/Patient/Settings";
import { LocaleProvider } from "./context/LocaleContext";

function App() {
  const route = createBrowserRouter([
>>>>>>> 32831a2732cfec2a0bde7f40f663134763e8c074
    {
      path: "/",
      element: <Layout />,
      children: [
<<<<<<< HEAD
<<<<<<< HEAD
        ...(role === "doctor"
          ? [
              { path: "appointments", element: <Appointments /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "diagnosis", element: <DiagnosisAssistant /> },
              { path: "treatment", element: <Treatment /> },
              { path: "my-patients", element: <MyPatients /> },
              { path: "reports", element: <Reports /> },
              { path: "notifications", element: <Notifications /> },
            ]
          : role === "admin"
          ? [
              { path: "notificationCenter", element: <NotificationCenter /> },
              { path: "drugChecker", element: <DrugChecker /> },
            ]
          : role === "patient"
          ? [
              { path: "ai-diagnosis-result", element: <AiDiagnosisResult /> },
              { path: "directory", element: <Directory /> },
              { path: "payment", element: <Payment /> },
            ]
          : []),
          ,
        {
          path:"help", element:<HelpSupport/>
        } ,       
        { path: "*", element: <NotFound /> },
=======
=======
>>>>>>> 32831a2732cfec2a0bde7f40f663134763e8c074
        {
          path: "appointments",
          element: <Appointments />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "AiDiagnosisResult",
          element: <AiDiagnosisResult />,
        },
        {
          path: "treatment",
          element: <Treatment />,
        },
        {
          path: "directory",
          element: <Directory />,
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "settings",
          element: <Settings />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
<<<<<<< HEAD
>>>>>>> 32831a2 (Settings Pages done & update Pages)
=======
>>>>>>> 32831a2732cfec2a0bde7f40f663134763e8c074
      ],
    },
  ]);

  return (
    <LocaleProvider>
      <RouterProvider router={route} />
    </LocaleProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Layout from "./Layouts/Layout";
import NotFound from "./Pages/NotFound/NotFound";
import Appointments from "./Pages/Doctor/Appointments/Appointments";
import Dashboard from "./Pages/Doctor/Dashboard";
import Treatment from "./Pages/Doctor/Treatment/treatment";
import DiagnosisAssistant from "./Pages/Doctor/Diagnosis/DiagnosisAssistant";
import MyPatients from "./Pages/Doctor/MyPatients/MyPatients";
import Reports from "./Pages/Doctor/Reports/Reports";
import Notifications from "./Pages/Doctor/Notifications/Notifications";
import NotificationCenter from "./Pages/Admin/NotificationCenter/NotificationCenter";
import DrugChecker from "./Pages/Admin/DrugChecker/DrugChecker";
import AiDiagnosisResult from "./Pages/Patient/AiDiagnosisResult";
import Directory from "./Pages/Patient/Directory";
import Payment from "./Pages/Patient/Payment";
import Service from "./Pages/Service/Service";
import LandingPage from "./Pages/Common/LandingPage/LandingPage";
import MainLayout from "./Layouts/MainLayout";
import HelpSupport from './Pages/Doctor/HelpAndSupport/HelpSupport';
import Contact from "./Pages/Contact/Contact";
import FAQ from "./Pages/Common/FAQ/FAQ";
import MedicalFiles from "./Pages/Doctor/MedicalFiles/MedicalFiles";
import SuggestedTreatments from "./Pages/Patient/SuggestedTreatments/SuggestedTreatments";
import PatientProfile from "./Pages/Patient/PatientProfile/PatientProfile";
import DoctorProfile from "./Pages/Admin/DoctorProfile/DoctorProfile";
import SystemSetting from "./Pages/Admin/SystemSetting/SystemSetting";

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
       { path: "contact", element: <Contact/>},
       { path: "faq", element: <FAQ />},
       { path: "*", element: <NotFound /> },
    ],
  },
    {
      path: "/",
      element: <Layout />,
      children: [
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
          
        {
          path: "HelpSupport", element: <HelpSupport />
        },
        {
          path: "MedicalFiles", element: <MedicalFiles />
        },
        {
          path: "SuggestedTreatments", element: <SuggestedTreatments />
        },
        {
           path:"PatientProfile", element: <PatientProfile />
        },
        {
          path:"DoctorProfile", element:<DoctorProfile/>
        },
        {
          path:"systemSetting", element:<SystemSetting/>
        }
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
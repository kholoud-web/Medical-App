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
import DoctorSettings from "./Pages/Doctor/Settings";
import NotificationCenter from "./Pages/Admin/NotificationCenter/NotificationCenter";
import DrugChecker from "./Pages/Admin/DrugChecker/DrugChecker";
import AiDiagnosisResult from "./Pages/Patient/AiDiagnosisResult";
import DiagnosisModule from "./Pages/Patient/DiagnosisModule";
import Directory from "./Pages/Patient/Directory";
import PatientHelp from "./Pages/Patient/Help";
import Payment from "./Pages/Patient/Payment";
import PatientSettings from "./Pages/Patient/Settings";
import Login from "./Pages/Auth/Login";
import Service from "./Pages/Service/Service";
import LandingPage from "./Pages/Common/LandingPage/LandingPage";
import About from "./Pages/Common/LandingPage/components/About";
import MainLayout from "./Layouts/MainLayout";
import HelpSupport from './Pages/Doctor/HelpAndSupport/HelpSupport';
import Contact from "./Pages/Contact/Contact";
import FAQ from "./Pages/Common/FAQ/FAQ";
import Finance from "./Pages/Doctor/Finance/Finance";
import MedicalFiles from "./Pages/Doctor/MedicalFiles/MedicalFiles";
import SuggestedTreatments from "./Pages/Patient/SuggestedTreatments/SuggestedTreatments";
import PatientProfile from "./Pages/Patient/PatientProfile/PatientProfile";
import DoctorProfile from "./Pages/Admin/DoctorProfile/DoctorProfile";
import SystemSetting from "./Pages/Admin/SystemSetting/SystemSetting";
import DoctorsManagement from "./Pages/Admin/DoctorsManagement/DoctorsManagement";import FindDoctor from './Pages/Customers/FindDoctor/FindDoctor'
import PatientsManagement from "./Pages/Admin/PatientsManagement/PatientsManagement";
import Physiotherapy from "./Pages/Patient/Physiotherapy/Physiotherapy";
import AiPerformance from "./Pages/Patient/Physiotherapy/AiPerformance/VideoUploadOverlay";
import Register from './Pages/Auth/Registration';
import ResetPassword from './Pages/Auth/ResetPassword';
import ResetSuccess from "./Pages/Auth/ResetSuccess";
import Inquiries from "./Pages/Doctor/Inquiries/Inquiries";
import PatientDashboard from "./Pages/Patient/Dashboard/PatientDashboard";
import Consultations from "./Pages/Doctor/Consultation/Consultations";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import ConfirmEmail from "./Pages/Auth/ConfirmEmail";
import AiResults from "./Pages/Patient/Physiotherapy/AiPerformance/AiResults";


function App() {
  const role = "patient";
  const helpElement = role === "patient" ? <PatientHelp /> : <HelpSupport />;
  const settingsElement = role === "doctor" ? <DoctorSettings /> : <PatientSettings />;

  const router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "landing", element: <LandingPage /> },
    { path: "/register", element: <Register />,},
    { path: "/reset-password", element: <ResetPassword /> },
    { path:"/reset-success" ,element:<ResetSuccess />},
    {path : "/confirm-email", element : <ConfirmEmail/>},

  
      {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "services", element: <Service /> },
      { path: "about", element: <About /> },
       { path: "contact", element: <Contact/>},
      { path: "find-doctor", element: <FindDoctor /> },
     
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
            { path: "Consultations", element: <Consultations /> },
            
            {path:"finances",element:<Finance />}

          ]
          : role === "admin"
            ? [
               { path: "dashboard", element:<AdminDashboard/>},
              { path: "notificationCenter", element: <NotificationCenter /> },
              {path:"patientsManagement", element:<PatientsManagement/>},
              { path: "doctorsManagement", element: <DoctorsManagement /> },
              

            ]
          : role === "patient"
          ? [
            { path: "dashboard", element:<PatientDashboard/>},
              { path: "ai-diagnosis-result", element: <AiDiagnosisResult /> },
              { path: "drugChecker", element: <DrugChecker /> },
              { path: "directory", element: <Directory /> },
              { path: "payment", element: <Payment /> },
              { path: "physiotherapy",element:<Physiotherapy/>},
               {path:"inquiries", element: <Inquiries/>},
              {path:"AiPerformance",element:<AiPerformance/>},
              { path: "diagnosis-module", element: <DiagnosisModule /> },
              {path: "/ai-results",element: <AiResults />,},
            ]
          : []),
        {
          path: "settings", element: settingsElement
        },
        {
          path: "help", element: helpElement
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
        },
        {
              path:"helpSupport" , element:<HelpSupport/>
        }
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

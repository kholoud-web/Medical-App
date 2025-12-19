import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Layout from "./Layouts/Layout";
import NotFound from "./Pages/NotFound/NotFound";

// Doctor
import Appointments from "./Pages/Doctor/Appointments/Appointments";
import Dashboard from "./Pages/Doctor/Dashboard";
import Treatment from "./Pages/Doctor/Treatment/treatment";
import DiagnosisAssistant from "./Pages/Doctor/Diagnosis/DiagnosisAssistant";
import MyPatients from "./Pages/Doctor/MyPatients/MyPatients";
import Reports from "./Pages/Doctor/Reports/Reports";
import Notifications from "./Pages/Doctor/Notifications/Notifications";

// Admin
import NotificationCenter from "./Pages/Admin/NotificationCenter/NotificationCenter";
import DrugChecker from "./Pages/Admin/DrugChecker/DrugChecker";

// Common
import Service from "./Pages/Service/Service";

function App() {
  const role = "admin"; // or "doctor"

  const router = createBrowserRouter([
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
          : []),

        { path: "service", element: <Service /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

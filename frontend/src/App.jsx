import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Appointments from "./Pages/Doctor/Appointments/Appointments";
import Layout from "./Layouts/Layout";
import { RouterProvider } from "react-router";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/Doctor/Dashboard";
import Treatment from "./Pages/Doctor/Treatment/treatment";
import AiDiagnosisResult from "./Pages/Patient/AiDiagnosisResult";
import PatientProfile from "./Pages/Patient/PatientProfile";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
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
          path: "PatientProfile",
          element: <PatientProfile />,
        },
        {
          path: "treatment",
          element: <Treatment />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;

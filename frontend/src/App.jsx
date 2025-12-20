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
import Settings from "./Pages/Patient/Settings";
import { LocaleProvider } from "./context/LocaleContext";

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

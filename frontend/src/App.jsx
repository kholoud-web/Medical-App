// src/App.jsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// تم حذف: import { Provider } from 'react-redux';
// تم حذف: import { store } from './Redux/store'; 
// (لأن هذين الاستيرادين أصبحا غير ضروريين بعد إزالة الـ Provider من هنا)

import Layout from './Layouts/Layout';
import Dashboard from './Pages/Doctor/Dashboard';
import Appointments from './Pages/Doctor/Appointments/Appointments';
import Treatment from './Pages/Doctor/Treatment/treatment';
import DiagnosisPage from './Pages/Doctor/Diagnosis/diagnosis';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        // يفضل استخدام index: true كبديل لـ path: '/' لتحديد الصفحة الرئيسية الفرعية
        { index: true, element: <Dashboard /> }, 
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'appointments', element: <Appointments /> },
        { path: 'treatment', element: <Treatment /> },
        { path: 'diagnosis', element: <DiagnosisPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return (
    // تم حذف وسم <Provider store={store}>
    // <RouterProvider router={router} /> هو كل ما تحتاجه هنا
    <RouterProvider router={router} />
  );
}

export default App;
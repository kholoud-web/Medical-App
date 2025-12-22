// Layouts/CustomerLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
// import PatientNavbar from '../components/Patient/PatientNavbar'

function CustomerLayout() {
  return (
    <div className="min-h-screen">
      {/* <PatientNavbar /> */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default CustomerLayout

import Header from '../Pages/Common/components/Header'
import Footer from '../Pages/Common/components/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>

  )
}

export default MainLayout
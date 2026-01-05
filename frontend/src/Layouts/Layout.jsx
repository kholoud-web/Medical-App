import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Common/Header'
import { useState } from 'react'

export default function Layout() {
  const [showSideBar, setShowSideBar] = useState(false)
  return (
    <div className='flex flex-col overflow-hidden min-h-screen'>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className='md:flex overflow-hidden w-full relative'>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className='w-full flex-1 p-5 md:ml-0'>
          <Outlet/>
        </div>
        {/* Overlay for mobile when sidebar is open */}
        {showSideBar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
            onClick={() => setShowSideBar(false)}
          />
        )}
      </div>
    </div>
  )
}

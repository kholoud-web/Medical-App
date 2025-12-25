import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Common/Header'
import { useState } from 'react'

export default function Layout() {
  const [showSideBar,setShowSideBar]=useState(false)
  return (
    <div className='flex flex-col min-h-screen'>
    <Header  showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    <div className='md:flex w-full'>
        <div className=''><SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} /></div>
        <div className='w-full flex-1 p-5'><Outlet/></div>
    </div>
    </div>
  )
}

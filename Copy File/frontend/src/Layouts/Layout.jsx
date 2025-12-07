import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Common/Header'

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <div className='md:flex w-full'>
        <div className='w-72 h-full bg-white'><SideBar/></div>
        <div className='w-full flex-1 p-5'><Outlet/></div>
    </div>
    </div>
  )
}

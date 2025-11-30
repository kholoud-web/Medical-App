import React from 'react'
import SideBar from './SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='md:flex'>
        <div className='w-72 h-full bg-white'><SideBar/></div>
        <div className='w-full flex-1 p-5'><Outlet/></div>
    </div>
  )
}

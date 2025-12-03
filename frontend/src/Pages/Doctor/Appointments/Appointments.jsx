import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import TodayAppointments from './Components/TodayAppointments'
import PastAppointments from './Components/PastAppointments'

export default function Appointments() {
    const Links =[
        {
            title:"Follow-up",
            link:"/"
        },
        {
            title:"New Patient",
            link:"/NewPatient"
        },
        {
            title:"Urgent",
            link:"/Urgent"
        }
    ]


   
  return (
    <div className='space-y-4 p-2'>
   <div>
     <h2 className='text-2xl'>Appointments</h2>
   <div className='flex gap-4 justify-between flex-row max-[1252px]:flex-col'>
     <p className='text-primary-gray text-2xl '>Manage and organize your patient visits effectively</p>
     <div className='flex items-center max-[385px]:flex-wrap  gap-4'>
        {
            Links.map((link,index)=>(
                <div key={index}><NavLink  to={link.link}   className={({ isActive }) =>
    isActive ? "bg-primary-blue text-white py-1 px-3 border border-primary-blue rounded-xl" : "btn"
  } >{link.title}</NavLink></div>
            ))}
     </div>
   </div>
   </div>


   {/* main */}
   <div className='space-y-4'>
     <TodayAppointments/>
    <PastAppointments/>
   </div>

    </div>
  )
}

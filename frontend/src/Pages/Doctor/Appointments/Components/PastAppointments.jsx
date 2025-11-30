import React from 'react'
import AppointmentCart from './AppointmentCart'

export default function PastAppointments() {
    const completedVisits=[
        {
            name:"John Doe",
            age:"25",
            image:"/avatar.svg",
            status:"completed",
            date:"2023-05-25",
            time:"13:00",
            type:"checkup"
        },
        {
            name:"John Doe",
            age:"25",
            image:"/avatar.svg",
            status:"completed",
            date:"2023-05-25",
            time:"13:00",
            type:"checkup"
        },
        {
            name:"John Doe",
            age:"25",
            image:"/avatar.svg",
            status:"completed",
            date:"2023-05-25",
            time:"13:00",
            type:"checkup"
        },
    ]
  return (
    <div className='space-y-3'>
        <p className='text-primary-gray text-xl'>Past Appointments</p>
        <div className='grid grid-cols-2 max-[675px]:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                 {completedVisits.map((visit,index)=>(<AppointmentCart key={index} info={visit} />))}
               </div>
    </div>
  )
}

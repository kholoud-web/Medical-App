import React from 'react'

export default function NotificationCenter() {
    const notificationList= [
        {icon:"/Commercial.png",image:"/48abc0cc4e6933f06eab5de92a83451b347abfa7 (5).png",title:"Appointments Alerts",details:"Reminders and confirmations of upcoming appointments",},
        {icon:"/ee69c4bf0b0d351c7000a2eab5c4e7282da2879a.png",image:"/e3605497445f091ab4c789016b4ff535dda6190a.png",title:"Medical Notifications",details:"New lab results and medical reports",},
        {icon:"/6d91eed58250a7775d67199bc6b9a1ad4ac92377.png",image:"/ac6851c876abd3ed939e44757c7d22a2a55dab70.png",title:"Physiotherapy Alerts",details:"Reminders for your exercises and sessions",},
        {icon:"/Iconography - Caesarzkn.png",image:"/4d3fd5ab33e17466e62b9a975762c88d361a044b (2).png",title:"Doctors' Responses",details:"Replies to your inquiries and messages",}
    ]
  return (
    <div>
        <h2 className="font-bold text-3xl text-center mb-4 " >Notification Center</h2>
        <div className='grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'>
            {notificationList.map((item,index)=>
            <div className='bg-gradient-to-t h-full flex from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl'>
                <div className='flex items-center gap-5 bg-white w-full  rounded-xl px-3 py-20' key={index} >
                <div className='flex items-center gap-3'>
                    <div className='bg-[#4682FA4D]  rounded-full  p-2'>
                <img src={item.icon} alt={item.title} className='w-10 h-10 object-cover' />
                </div>

               <div> <h2 className='font-bold text-xl'>{item.title}</h2>
                <p>{item.details}</p>
                </div>
                </div>
                 {/* image */}
                 <div>
                     <img src={item.image} alt={item.title} className='w-10 h-10 object-cover' />
                 </div>
            </div>
                
            </div>
            )}
        </div>
    </div>
  )
}

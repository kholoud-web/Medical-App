import React from 'react'


export default function Notifications() {

    const notificationList =[
        {icon:"/User Male.png",title:"Patient Alerts and Appointments",
            details:[
                {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
               date: "2025-12-11T12:00:00",
            },
            {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
                date:"Tomorrow at 12:00 pm",
            }
            ]
            
        },
        {icon:"/Goal.png",title:"Management Updates",
            details:[
                {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
                date:"Tomorrow at 12:00 pm",
            },
            {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
                date:"Tomorrow at 12:00 pm",
            }
            ]
        },
        {icon:"/Commercial.png",title:"System alerts and reminders",
            details:[
                {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
                date:"Tomorrow at 12:00 pm",
            },
            {
                image:"/patient.png",
                title:"Appointment confirmed for Zyad Mohamed. ",
                date:"Tomorrow at 12:00 pm",
            }
            ]
        }
    ]
  return (
    <div className=''>
        <h2 className="font-bold text-3xl text-center">Notifications</h2>
        {/*  */}
        <div className='space-y-3 '>
            {notificationList.map((notification,index)=>
           <div key={index} className=''>
            <div  className='flex gap-4 items-center mb-3'>
           <div className='bg-[#4682FA4D] rounded-full w-fit p-2'>
             <img src={notification.icon} className='w-8 h-8 object-cover' alt={notification.title} />
           </div>
             <h2 className='font-semibold text-xl'>{notification.title}</h2>
           </div>
             
             {/*  */}
          
             {notification.details.map((item,index)=>
           <div key={index} className='bg-gradient-to-b h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl'>
            <div className='bg-slate-100 p-2 flex items-center  gap-2'>
               <div> <img src={item.image} alt={notification.title} /></div>
              <div>
                 <h2 className='font-bold '>{item.title}</h2>
               <p className='text-[#777777]'>{item.date}</p>
              </div>
            
                </div>

           </div>
        
        )}
          </div>
        
            
            )}
        </div>
    </div>
  )
}

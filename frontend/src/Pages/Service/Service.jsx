import React from 'react'
import RequierdLogin from './Component/RequierdLogin'
import { Link } from 'react-router-dom'

export default function Service() {
    const serviceList=[
        {title:"Online Diagnosis",icon:"/healthicons_stethoscope.png",desc:"Receive expert medical assessments and diagnosis through our secure online platform. Connect with specialists from anywhere.",link:"#"},
        {title:"Medical Records",icon:"/Group-4.png",desc:"Securely access and manage your complete medical history. Share records with healthcare providers instantly.",link:"#"},
        {title:"Treatment Plans",icon:"/fluent-mdl2_diet-plan-notebook.png",desc:"Customized treatment strategies designed for your specific health conditions. Track progress and outcomes.",link:"#"},
        {title:"Appointment Scheduling",icon:"/Group.png",desc:"Book, reschedule, or cancel appointments with ease. Get reminders and manage your healthcare calendar."},
        {title:"Prescription Management",icon:"/Vector (1).png",desc:"Digital prescriptions sent directly to your pharmacy. Track medications and set refill reminders."},
        {title:"Physiotherapy (AI-Powered)",icon:"/Vector (2).png",desc:"Get instant AI feedback on your physiotherapy exercises with posture correction and progress reports sent directly to your physiotherapist.",link:"#"}
    ]
  return (
    <div className='space-y-7 px-8 py-16'>
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-bold'>Our Medical Services</h2>
            <p className='text-primary-gray'>Browse our comprehensive healthcare services. Login to unlock full access and start your health journey.</p>
        </div>

        <RequierdLogin/>

         {/*  */}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch auto-rows-fr'>


            {serviceList.map((item, index) => (
  <div
    key={index}
    className="space-y-2 bg-gradient-to-b h-full  from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl flex"
  >
    <div className="bg-white rounded-xl p-4 flex flex-col h-full space-y-2">
      
      <div className="flex items-center justify-between">
        <img src={item.icon} alt={item.title} className="w-10 h-10" />
        <span className="p-1 rounded-full bg-[#D9D9D98A]">
          <img src="/si_lock-line.png" alt={item.title} className="w-5 h-5" />
        </span>
      </div>

      <h2 className="font-bold text-xl">{item.title}</h2>
      <p className='flex-grow'>{item.desc}</p>

      
    
        <Link
  to={item.link || "#"}
  className="btn inline-block w-[90%] mx-auto mt-auto text-center "
>
  Login to use
</Link>
     </div>
  </div>
))}


        </div>
    </div>
  )
}

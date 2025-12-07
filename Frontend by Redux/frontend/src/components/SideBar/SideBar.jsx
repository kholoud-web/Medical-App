import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaSearchPlus } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { LuChartColumn } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { PiHandCoinsThin } from "react-icons/pi";
import { FiFilePlus } from "react-icons/fi";
import { LuNotebookText } from "react-icons/lu";
import { VscNote } from "react-icons/vsc";
import { TiMessages } from "react-icons/ti";
import { FaPersonThroughWindow } from "react-icons/fa6";
import { BiInjection } from "react-icons/bi";
import { TbMessageCirclePlus } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";



export default function SideBar() {
    const role = "Patient";
    const DoctorNavBar=[
        {
            icon:<MdOutlineDashboard className='inline-block mr-2' />,
            title:"Dashboard",
            link:"/dashboard"
        },
        {
            icon:<FiUsers className='inline-block mr-2' />,
            title: "My patients",
            link:"/my patients"
        },
        {
            icon:<CiCircleQuestion  className='inline-block mr-2' />,
            title: "Consultations",
            link:"/consultations"
        },
        {
            icon:<FaSearchPlus  className='inline-block mr-2' />,
            title: "Diagnosis",
            link:"/diagnosis"
        },
        {
            icon:<PiHandCoinsThin   className='inline-block mr-2' />,
            title: "Treatment",
            link:"/treatment",
           
        }       ,
        {
            icon:<FaChartLine  className='inline-block mr-2' />,
            title: "Reports",
            link:"/reports"
        },
        {
            icon:<LuChartColumn  className='inline-block mr-2' />,
            title: "Finances",
            link:"/finances"
        },
        {
            icon:<MdOutlineEventNote className='inline-block mr-2' />,
            title: "Appointments",
            link:"/appointments"
        }
    ]

     const PatientNavBar=[
        {
            icon:<MdOutlineDashboard className='inline-block mr-2' />,
            title:"Dashboard",
            link:"/dashboard"
        },
        {
            icon:<MdOutlineAddBox  className='inline-block mr-2' />,
            title:"Diagnosis Module",
            link:"/DiagnosisModule"
        },
        {
            icon:<TbMessageCirclePlus  className='inline-block mr-2' />,
            title: "Ai Diagnosis Result",
            link:"/AiDiagnosisResult"
        },
         {
            icon:<FaSearchPlus  className='inline-block mr-2' />,
            title: "Diagnosis",
            link:"/diagnosis"
        },
        {
            icon:<BiInjection   className='inline-block mr-2' />,
            title: "Drug Checker",
            link:"/DrugChecker"
        },
        {
            icon:<FaPersonThroughWindow  className='inline-block mr-2' />,
            title: "physiotherapy",
            link:"/physiotherapy"
        },
        {
            icon:<TiMessages   className='inline-block mr-2' />,
            title: "Inqiries",
            link:"/inqiries",
           
        }       ,
        {
            icon:<VscNote   className='inline-block mr-2' />,
            title: "Complaints",
            link:"/complaints"
        },
        {
            icon:<LuNotebookText   className='inline-block mr-2' />,
            title: "Directory",
            link:"/directory"
        },
        {
            icon:<MdOutlineEventNote className='inline-block mr-2' />,
            title: "Appointments",
            link:"/appointments"
        },
        {
            icon:<FiFilePlus  className='inline-block mr-2' />,
            title: "Medical Files",
            link:"/medicalFiles"
        },
        {
            icon:<PiHandCoinsThin   className='inline-block mr-2' />,
            title: "Treatment",
            link:"/treatment",
           
        }       ,
    ]

    const generalMenu =[
        {
            icon:<IoSettingsOutline  className='inline-block mr-2' />,
            title: "Settings",
            link:"/settings"
        },
        {
            icon:<CiCircleQuestion  className='inline-block mr-2' />,
            title: "Help",
            link:"/help"
        },
    ]
  return (
    <div className='space-y-4 text-lg h-min-screen overflow-y-auto scrollbar-hide md:block hidden top-0 left-0 z-[9999] bg-white shadow-[4px_0_15px_rgba(0,0,0,0.2)] px-8 py-5 '>
      
       <h2 className='text-2xl font-bold px-3'>MENU</h2>
       <ul className='my-1 font-bold'>
        {role === "Doctor" ? (
    DoctorNavBar.map((item, index) => (
        <li key={index} className="my-1">
            <NavLink
                to={item.link}
                className={({ isActive }) =>
                    isActive
                        ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                        : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
                }
            >
                {item.icon} {item.title}
            </NavLink>
        </li>
    ))
) : role === "Patient" ? PatientNavBar.map((item, index) => (
        <li key={index} className="">
            <NavLink
                to={item.link}
                className={({ isActive }) =>
                    isActive
                        ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                        : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
                }
            >
                {item.icon} {item.title}
            </NavLink>
        </li>
    )): ""}
           
       </ul>



       <h2 className='text-2xl font-bold px-3'>GENERAL</h2>
       <ul className=' font-bold'>
        {
            generalMenu.map((item,index)=>(
                <li key={index} className='my-2'>
                    <NavLink to={item.link} className= {({isActive})=>isActive ? "bg-primary-blue text-white py-3 px-3 rounded-xl" :"py-3 px-3"}>{item.icon} {item.title}</NavLink>
                </li>
            ))
        }
        <li>
             <button className='font-bold py-1 px-3 '>
            <FiLogOut className='inline-block mr-2 ' /><span className='text-red-500'>Logout</span>
       </button>
        </li>
       </ul>
      
    </div>
  )
}

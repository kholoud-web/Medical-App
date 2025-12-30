import React from "react";
import { Link, NavLink } from "react-router-dom";
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
import { MdOutlinePayment } from "react-icons/md";


export default function SideBar({ showSideBar, setShowSideBar }) {
  const role = "patient";
  const DoctorNavBar = [
    {
      icon: <MdOutlineDashboard className="inline-block mr-2" />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <FiUsers className="inline-block mr-2" />,
      title: "My patients",
      link: "/my-patients",
    },
    {
      icon: <FiFilePlus className="inline-block mr-2" />,
      title: "Consultations",
      link: "/consultations",
    },
    {
      icon: <FaSearchPlus className="inline-block mr-2" />,
      title: "Diagnosis",
      link: "/diagnosis",
    },
   
    {
      icon: <LuChartColumn className="inline-block mr-2" />,
      title: "Finances",
      link: "/finances",
    },
  ];

  const AdminNavBar = [
    {
      icon: <MdOutlineDashboard className="inline-block mr-2" />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <img src="/plus_icon.png" className="inline-block mr-2 w-4 h-4" />,
      title: "Doctor Management",
      link: "/doctor-management",
    },
    {
      icon: (
        <img src="/user_syting.png" className="inline-block mr-2 w-4 h-4" />
      ),
      title: "Patient Management",
      link: "/patient-management",
    },
    {
      icon: <img src="/Vector (3).png" className="inline-block mr-2 w-4 h-4" />,
      title: "System Settings",
      link: "/system-settings",
    },
  ];

  const PatientNavBar = [
    {
      icon: <MdOutlineDashboard className="inline-block mr-2" />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <MdOutlineAddBox className="inline-block mr-2" />,
      title: "Diagnosis Module",
      link: "/diagnosis-module",
    },
    {
      icon: <TbMessageCirclePlus className="inline-block mr-2" />,
      title: "Ai Diagnosis Result",
      link: "/ai-diagnosis-result",
    },
    {
      icon: <BiInjection className="inline-block mr-2" />,
      title: "Drug Checker",
      link: "/drugChecker",
    },
    {
      icon: <FaPersonThroughWindow className="inline-block mr-2" />,
      title: "physiotherapy",
      link: "/physiotherapy",
    },
    {
      icon: <TiMessages className="inline-block mr-2" />,
      title: "Inquiries",
      link: "/inquiries",
    },
    {
      icon: <FiFilePlus className="inline-block mr-2" />,
      title: "Medical Files",
      link: "/medicalFiles",
    },
    {
      icon: <MdOutlinePayment  className="inline-block mr-2" />,
      title: "Payments",
      link: "/payment",
    }
  ];

  const generalMenu = [
    {
      icon: <IoSettingsOutline className="inline-block mr-2" />,
      title: "Settings",
      link: "/settings",
    },
    {
      icon: <CiCircleQuestion className="inline-block mr-2" />,
      title: "Help",
      link: "/help",
    },
  ];
  return (
<div
  className={`
    space-y-4 text-lg overflow-y-auto scrollbar-hide
    max-[540px]:w-full max-[700px]:w-1/2 md:w-64 lg:w-64 xl:w-72

    top-24 
    fixed md:top-0 left-0 z-[9999]
    h-screen
    bg-white shadow-[4px_0_15px_rgba(0,0,0,0.2)]
    px-8 py-5
    transform transition-transform duration-300 ease-in-out
    
    ${showSideBar ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    top-26
    max:[400px]:top-14
    md:static
  `}
>



      <h2 className="text-2xl font-bold px-3">MENU</h2>
      <ul className="my-1 font-bold">
        {role === "doctor"
          ? DoctorNavBar.map((item, index) => (
              <li key={index} className="my-1">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                      : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
                  }
                    onClick={() => setShowSideBar(false)}
                >
                  {item.icon} {item.title}
                </NavLink>
              </li>
            ))
          : role === "patient"
          ? PatientNavBar.map((item, index) => (
              <li key={index} className="my-1">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                      : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
                  }
                    onClick={() => setShowSideBar(false)}
                >
                  {item.icon} {item.title}
                </NavLink>
              </li>
            ))
          : role === "admin"
          ? AdminNavBar.map((item, index) => (
              <li key={index} className="my-1">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                      : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
                  }
                    onClick={() => setShowSideBar(false)}
                >
                  {item.icon} {item.title}
                </NavLink>
              </li>
            ))
          : ""}
      </ul>

      <h2 className="text-2xl font-bold px-3">GENERAL</h2>
      <ul className=" font-bold">
        {generalMenu.map((item, index) => (
          <li key={index} className="my-2">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary-blue text-white py-3 px-3 rounded-xl"
                  : "py-3 px-3"
              }
            >
              {item.icon} {item.title}
            </NavLink>
          </li>
        ))}
        <li>
          <button className="font-bold py-1 px-3 ">
            <FiLogOut className="inline-block mr-2 " />
            <span className="text-red-500">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

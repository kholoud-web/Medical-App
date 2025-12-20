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
import { FaRegUserCircle } from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";




export default function SideBar() {
  const { t } = useLocale();
  const role = "Patient";
  const DoctorNavBar = [
    {
      icon: <MdOutlineDashboard className='inline-block mr-2' />,
      titleKey: "nav.dashboard",
      link: "/dashboard"
    },
    {
      icon: <FiUsers className='inline-block mr-2' />,
      titleKey: "nav.myPatients",
      link: "/my patients"
    },
    {
      icon: <CiCircleQuestion className='inline-block mr-2' />,
      titleKey: "nav.consultations",
      link: "/consultations"
    },
    {
      icon: <FaSearchPlus className='inline-block mr-2' />,
      titleKey: "nav.diagnosis",
      link: "/diagnosis"
    },
    {
      icon: <PiHandCoinsThin className='inline-block mr-2' />,
      titleKey: "nav.treatment",
      link: "/treatment",

    },
    {
      icon: <FaChartLine className='inline-block mr-2' />,
      titleKey: "nav.reports",
      link: "/reports"
    },
    {
      icon: <LuChartColumn className='inline-block mr-2' />,
      titleKey: "nav.finances",
      link: "/finances"
    },
    {
      icon: <MdOutlineEventNote className='inline-block mr-2' />,
      titleKey: "nav.appointments",
      link: "/appointments"
    }
  ]

  const PatientNavBar = [
    {
      icon: <MdOutlineDashboard className='inline-block mr-2' />,
      titleKey: "nav.dashboard",
      link: "/dashboard"
    },
    {
      icon: <MdOutlineAddBox className='inline-block mr-2' />,
      titleKey: "nav.diagnosisModule",
      link: "/DiagnosisModule"
    },
    {
      icon: <TbMessageCirclePlus className='inline-block mr-2' />,
      titleKey: "nav.aiDiagnosisResult",
      link: "/AiDiagnosisResult"
    },
    {
      icon: <BiInjection className='inline-block mr-2' />,
      titleKey: "nav.drugChecker",
      link: "/DrugChecker"
    },
    {
      icon: <FaPersonThroughWindow className='inline-block mr-2' />,
      titleKey: "nav.physiotherapy",
      link: "/physiotherapy"
    },
    {
      icon: <TiMessages className='inline-block mr-2' />,
      titleKey: "nav.inquiries",
      link: "/inqiries",

    },
    {
      icon: <VscNote className='inline-block mr-2' />,
      titleKey: "nav.complaints",
      link: "/complaints"
    },
    {
      icon: <LuNotebookText className='inline-block mr-2' />,
      titleKey: "nav.directory",
      link: "/directory"
    },
    {
      icon: <PiHandCoinsThin className='inline-block mr-2' />,
      titleKey: "nav.payment",
      link: "/payment",

    },
    {
      icon: <MdOutlineEventNote className='inline-block mr-2' />,
      titleKey: "nav.appointments",
      link: "/appointments"
    },
    {
      icon: <FiFilePlus className='inline-block mr-2' />,
      titleKey: "nav.medicalFiles",
      link: "/medicalFiles"
    },
    {
      icon: <PiHandCoinsThin className='inline-block mr-2' />,
      titleKey: "nav.treatment",
      link: "/treatment",

    },
  ]

  const generalMenu = [
    {
      icon: <IoSettingsOutline className='inline-block mr-2' />,
      titleKey: "nav.settings",
      link: "/settings"
    },
    {
      icon: <CiCircleQuestion className='inline-block mr-2' />,
      titleKey: "nav.help",
      link: "/help"
    },
  ]
  return (
    <div className="hidden px-8 py-5 space-y-4 overflow-y-auto text-lg bg-white shadow h-min-screen md:block">
      <h2 className="px-3 text-2xl font-bold">MENU</h2>

      <h2 className='px-3 text-2xl font-bold'>{t("menu.main")}</h2>
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
                {item.icon} {t(item.titleKey)}
              </NavLink>
            </li>
          ))
        ) : role === "Patient" ? PatientNavBar.map((item, index) => (
          <li key={index} className="my-1">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary-blue text-white py-3 px-3 rounded-xl block w-full"
                  : "py-3 px-3 rounded-xl hover:bg-primary-blue  hover:text-white transition-all duration-300 block w-full"
              }
            >
              {item.icon} {t(item.titleKey)}
            </NavLink>
          </li>
        )) : ""}

      </ul>

      <h2 className="px-3 text-2xl font-bold">GENERAL</h2>


      <h2 className='px-3 text-2xl font-bold'>{t("menu.general")}</h2>
      <ul className='font-bold '>
        {
          generalMenu.map((item, index) => (
            <li key={index} className='my-2'>
              <NavLink to={item.link} className={({ isActive }) => isActive ? "bg-primary-blue text-white py-3 px-3 rounded-xl" : "py-3 px-3"}>{item.icon} {t(item.titleKey)}</NavLink>
            </li>
          ))
        }
        <li>
          <button className="px-3 py-1 font-bold text-red-500">
            <FiLogOut className="inline-block mr-2" /> Logout
          </button>
        </li>
      </ul>

    </div>
  )
}

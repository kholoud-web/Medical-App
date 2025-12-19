import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineEventNote,
  MdOutlineDashboard,
  MdOutlineAddBox,
} from "react-icons/md";
import {
  FiUsers,
  FiLogOut,
  FiFilePlus,
} from "react-icons/fi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaSearchPlus, FaRegUserCircle } from "react-icons/fa";
import { FaChartLine, FaPersonThroughWindow } from "react-icons/fa6";
import { LuChartColumn, LuNotebookText } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { PiHandCoinsThin } from "react-icons/pi";
import { VscNote } from "react-icons/vsc";
import { TiMessages } from "react-icons/ti";
import { BiInjection } from "react-icons/bi";
import { TbMessageCirclePlus } from "react-icons/tb";

export default function SideBar() {
  const role = "admin";

  const DoctorNavBar = [
    { icon: <MdOutlineDashboard />, title: "Dashboard", link: "/dashboard" },
    { icon: <FaRegUserCircle />, title: "Patient Profile", link: "/patient-profile" },
    { icon: <FiUsers />, title: "My Patients", link: "/my-patients" },
    { icon: <FaSearchPlus />, title: "Diagnosis", link: "/diagnosis" },
    { icon: <PiHandCoinsThin />, title: "Treatment", link: "/treatment" },
    { icon: <FaChartLine />, title: "Reports", link: "/reports" },
    { icon: <MdOutlineEventNote />, title: "Appointments", link: "/appointments" },
  ];

  const PatientNavBar = [
    { icon: <TbMessageCirclePlus />, title: "AI Diagnosis Result", link: "/ai-diagnosis-result" },
    { icon: <LuNotebookText />, title: "Directory", link: "/directory" },
    { icon: <PiHandCoinsThin />, title: "Payment", link: "/payment" },
  ];

  const AdminNavBar = [
    { icon: <MdOutlineDashboard />, title: "Dashboard", link: "/dashboard" },
    { icon: <BiInjection />, title: "Drug Checker", link: "/drugChecker" },
    { icon: <FiUsers />, title: "Patients", link: "/my-patients" },
    { icon: <MdOutlineEventNote />, title: "Appointments", link: "/appointments" },
  ];

  const generalMenu = [
    { icon: <IoSettingsOutline />, title: "Settings", link: "/settings" },
    { icon: <CiCircleQuestion />, title: "Help", link: "/help" },
  ];

  const menu =
    role === "doctor"
      ? DoctorNavBar
      : role === "patient"
      ? PatientNavBar
      : AdminNavBar;

  return (
    <div className="space-y-4 text-lg h-min-screen overflow-y-auto md:block hidden bg-white shadow px-8 py-5">
      <h2 className="text-2xl font-bold px-3">MENU</h2>

      <ul className="font-bold">
        {menu.map((item, index) => (
          <li key={index} className="my-1">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary-blue text-white py-3 px-3 rounded-xl block"
                  : "py-3 px-3 rounded-xl hover:bg-primary-blue hover:text-white block"
              }
            >
              {item.icon} <span className="ml-2">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold px-3">GENERAL</h2>

      <ul className="font-bold">
        {generalMenu.map((item, index) => (
          <li key={index} className="my-2">
            <NavLink to={item.link}>
              {item.icon} <span className="ml-2">{item.title}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button className="font-bold py-1 px-3 text-red-500">
            <FiLogOut className="inline-block mr-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

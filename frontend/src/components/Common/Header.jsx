import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";




function Header() {
  const role = "admin";
  const date = dayjs().format("dddd, MMMM D, YYYY");
  return (
    <>
      <div className=" flex px-7 gap-2 items-center bg-white  drop-shadow-lg z-[10000]">
       <div className="flex"> 
        <div className="md:w-72 ">
          <img src="/logo.svg" alt="Logo" />
        </div>
       
{/*  */}

<div className="flex justify-between items-center ">
   <div className="hidden md:flex flex-col justify-center ">
          <h1 className="font-bold text-xl text-neutral-700">
            Good morning, Dr.Ahmed!
          </h1>
          <p className="font-normal text-lg text-neutral-600">{date}</p>
        </div>
  
    
</div>

        </div>

         <Link to={role === "doctor"? "/notifications": role === "admin" ? "/notificationCenter" : ""} className="inline-block ml-auto">

        <div className="flex gap-2 items-center relative">
          <IoIosNotificationsOutline size={30} className="text-gray-600" />
       <span className="absolute -top-1 left-4 flex items-center justify-center bg-primary-blue text-white text-xs w-5 h-5 rounded-full">
    2
  </span>
        </div>
      
      </Link>

      <div className="w-10 h-10 flex items-center justify-center bg-primary-blue rounded-full overflow-hidden">
        <img src="/avatar.svg" alt="user" className="w-10 h-10 object-cover "/>
      </div>

      <div className="md:hidden flex cursor-pointer">
        <FaBars />

      </div>
        
      </div>
    </>
  );
}

export default Header;

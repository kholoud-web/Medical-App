import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";




function Header({showSideBar, setShowSideBar}) {
  const role = "admin";
  const date = dayjs().format("dddd, MMMM D, YYYY");
  
  const handleToggleSidebar = () => {
    if (setShowSideBar) {
      setShowSideBar(!showSideBar);
    }
  };

  return (
    <>
      <div className="flex px-4 md:px-7 gap-2 items-center bg-white drop-shadow-lg z-[10000] relative">
        {/* Burger menu button - visible on mobile */}
        <div
          className="md:hidden flex cursor-pointer text-2xl text-gray-600 hover:text-primary-blue transition-colors"
          onClick={handleToggleSidebar}
          aria-label="Toggle menu"
        >
          <FaBars />
        </div>

        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <Link to="/" className="w-24 md:w-72 flex-shrink-0">
            <img src="/logo.svg" alt="Logo" className="h-12 md:h-auto w-auto" />
          </Link>
       
          {/* Greeting - hidden on mobile */}
          <div className="hidden md:flex flex-col justify-center">
            <h1 className="font-bold text-xl text-neutral-700">
              Good morning, Dr.Ahmed!
            </h1>
            <p className="font-normal text-lg text-neutral-600">{date}</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to={role === "doctor" ? "/notifications" : role === "admin" ? "/notificationCenter" : ""} 
            className="inline-block"
          >
            <div className="flex gap-2 items-center relative">
              <IoIosNotificationsOutline size={30} className="text-gray-600" />
              <span className="absolute -top-1 left-4 flex items-center justify-center bg-primary-blue text-white text-xs w-5 h-5 rounded-full">
                2
              </span>
            </div>
          </Link>

          <div className="w-10 h-10 flex items-center justify-center bg-primary-blue rounded-full overflow-hidden flex-shrink-0">
            <img src="/avatar.svg" alt="user" className="w-10 h-10 object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
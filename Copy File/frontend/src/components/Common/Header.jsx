import React from "react";
import dayjs from "dayjs";

function Header() {
  const date = dayjs().format("dddd, MMMM D, YYYY");
  return (
    <>
      <div className="w-screen flex gap-1 px-7 bg-white drop-shadow-lg z-[10000]">
       <div className="flex gap-20"> 
       
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-xl text-neutral-700">
            Good morning, Dr.Ahmed!
          </h1>
          <p className="font-normal text-lg text-neutral-600">{date}</p>
        </div>
        </div>
      </div>
    </>
  );
}

export default Header;

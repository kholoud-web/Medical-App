import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function Physiotherapy() {
  const [search, setSearch] = useState("");
  const videoList = [
    {
      title: "Back Stretch Exercise",
      link: "/backstretch",
      type: "Easy • 4:10 mins • Back",
      image: "/Frame 1707478955.png",
    },
    {
      title: "Shoulder Strengthening Exercise",
      link: "/backstretch",
      type: "Easy • 4:10 mins • Back",
      image: "/Frame 1707478955.png",
    },
    {
      title: "Leg Balance Exercise",
      link: "/backstretch",
      type: "Easy • 4:10 mins • Back",
      image: "/Frame 1707478955.png",
    },
  ];
  return (
    <div className="space-y-2 bg-gradient-to-b  from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex">
      <div className="bg-[#f7f7f7] rounded-xl p-4 flex flex-col  h-full w-full space-y-6">
        <div className="flex items-center  flex-row gap-3">
          <img src="/physiotherapy.png" className="w-4 h-4 inline-block" />
          <h2 className="font-semibold text-2xl">Physiotherapy</h2>
        </div>
        {/*  */}
        <div className="px-4 space-y-6">
          {/* button and status */}
          <div
            className="flex gap-3 max-[580px]:flex-col max-[580px]:items-start max-[880px]:flex-col xl:flex-row items-center  justify-between"
          >
            <div>
              {" "}
              <Link
                to={"/AiPerformance"}
                className="bg-[#207EFF] inline-block   py-2 px-4 rounded-lg border  border-primary-blue text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition-all ease-in-out duration-300"
              >
                Start AI-Based Measurement
              </Link>
            </div>
            <p>
              Program Status: <span className="text-primary-blue">Active</span>
            </p>
          </div>

          {/* search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="border w-full border-primary-blue p-2 pl-8 rounded-lg focus:outline-none"
            />
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* videos list */}
          <h2 className="text-[#6B6B6B]">Exercise Library</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
  {videoList.map((video, index) => (
    <div key={index} className="flex flex-col h-full">
      <Link
        to={video.link}
        className="flex flex-col h-full mb-4 border border-[#6B6B6B] p-4 rounded-xl"
      >
        {/* */}
        <div className="rounded-xl overflow-hidden h-48">
          <img
            src={video.image}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* */}
        <div className="flex flex-col flex-grow mt-2">
          <h3 className="text-[#6B6B6B] text-lg font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{video.type}</p>
        </div>

        {/**/}
        <button
          onClick={() => window.location.href = video.link}
          className="bg-[#207EFF] text-center w-full mt-4 py-2 px-4 rounded-lg border border-primary-blue text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition-all ease-in-out duration-300"
        >
          Play
        </button>
      </Link>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}

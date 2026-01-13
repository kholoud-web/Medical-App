import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import VideoUploadOverlay from "./AiPerformance/VideoUploadOverlay";

export default function Physiotherapy() {
  const [search, setSearch] = useState("");
  const [openUpload, setOpenUpload] = useState(false);

  const videoList = [
    {
      title: "The best fitness exercises",
      link: "https://www.youtube.com/watch?v=n_oGytZLPEE",
      type: "Easy • 4:10 mins • Back",
    },
    {
      title: "Minute FULL BODY Mobility Routine for Athletes",
      link: "https://www.youtube.com/watch?v=TFSYNWPYujQ",
      type: "Easy • 4:10 mins • Back",
    },
    {
      title: "Minute FULL BODY Mobility Routine for Athletes",
      link: "https://www.youtube.com/watch?v=nR8Lwyb0WW8",
      type: "Easy • 4:10 mins • Back",
    },
  ];

  const filteredVideos = videoList.filter(
    (video) =>
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.type.toLowerCase().includes(search.toLowerCase())
  );

  const getYoutubeThumbnail = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

    useEffect(() => {
    if (openUpload) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openUpload]);


  return (
    <div className="space-y-2 bg-gradient-to-b from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex">
      <div className="bg-[#f7f7f7] rounded-xl p-4 flex flex-col h-full w-full space-y-6">
        {/* header */}
        <div className="flex items-center gap-3">
          <img src="/physiotherapy.png" className="w-4 h-4" />
          <h2 className="font-semibold text-2xl">Physiotherapy</h2>
        </div>

        <div className="px-4 space-y-6">
          {/* button and status */}
          <div className="flex gap-3 max-[580px]:flex-col max-[580px]:items-start max-[880px]:flex-col xl:flex-row items-center justify-between">
            <button
  onClick={() => setOpenUpload(true)}
  className="bg-[#207EFF] py-2 px-4 rounded-lg border border-primary-blue text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition"
>
  Upload Video
</button>


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

          {/* videos */}
          <h2 className="text-[#6B6B6B]">Exercise Library</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
            {filteredVideos.map((video, index) => (
              <div key={index} className="flex flex-col h-full">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full mb-4 border border-[#6B6B6B] p-4 rounded-xl"
                >
                  {/* thumbnail */}
                  <div className="relative rounded-xl overflow-hidden h-48">
                    <img
                      src={getYoutubeThumbnail(video.link)}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />

                    {/* play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 p-4 rounded-full">
                        <FaPlay className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* info */}
                  <div className="flex flex-col flex-grow mt-3">
                    <h3 className="text-[#6B6B6B] text-lg font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{video.type}</p>
                  </div>

                  {/* button */}
                  <button
                    type="button"
                    className="bg-[#207EFF] mt-4 py-2 rounded-lg border border-primary-blue text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition"
                  >
                    Play
                  </button>
                </a>
              </div>
            ))}
            {filteredVideos.length === 0 && (
              <p className="text-center text-gray-500 col-span-full text-sm">
                No videos found
              </p>
            )}
          </div>
        </div>
      </div>
       {openUpload && (
  <VideoUploadOverlay onClose={() => setOpenUpload(false)} />
)}
    </div>
  );
 

}

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Reports() {
  const reportsList = [
    {
      icon: "/eae6aa659f4cedffa0b3836059b2198bdad45196.png",
      title: "Patient Reports",
      desc: "View and manage your comprehensive medical files.",
      path: "#",
      pathTitle: "View Files",
    },
    {
      icon: "/288980db16d4b94c9806b444024adac8760291e4 (3).png",
      title: "Lab Tests",
      desc: "Access your latest blood work and other lab results.",
      path: "#",
      pathTitle: "See Results",
    },
    {
      icon: "/4a9751922a809f9d153f6c87e4444f34c0976809.png",
      title: "Radiology Images",
      desc: "Browse X_rays , MRIs and other diagnostics images.",
      path: "#",
      pathTitle: "Open Gallery",
    },
  ];

  const PDFlist=[
     {
      icon: "/bc7a03624c09b1ba1d9c85a49de30f1f1b851ce9.png",
      title: "View PDF Reports",
      desc: "View and download all your reports in PDF format.",
      path: "#",
      pathTitle: "Access PDFs",
    },
    {
      icon: "/c2467bdde423ae40e66c4121539f4c6c66f4d5c8.png",
      title: "Compare Reports",
      desc: "Compare old and new reports to track your progress.",
      path: "#",
      pathTitle: "Start Comparison",
    }
  ]
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex justify-center items-center flex-col space-y-2">
        <h2 className="font-bold text-3xl ">Reports</h2>
        <p className="text-xl text-center">
          Access and manage all your medical reports in one place.
        </p>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-[570px]:grid-cols-1 xl:grid-cols-3 gap-3">
        {reportsList.map((item, index) => (
          <div
            key={index}
            className="space-y-2 bg-gradient-to-t h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl flex"
          >
            <div className="bg-white rounded-xl p-4 space-y-2 w-full">
              <div className="flex items-center justify-center mb-10">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
              </div>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-sm">{item.desc}</p>
              {/* path */}
              <div className="flex items-center justify-center">
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-primary-blue font-semibold"
                >
                  {item.pathTitle} <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF LIST */}
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-[570px]:grid-cols-1 xl:grid-cols-2 gap-3">
          {PDFlist.map((item, index) => (
          <div
            key={index}
            className="space-y-2 bg-gradient-to-t h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl"
          >
            <div className="bg-white rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-center mb-10">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
              </div>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-sm ">{item.desc}</p>
              {/* path */}
              <div className="flex items-center justify-center">
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-primary-blue font-semibold"
                >
                  {item.pathTitle} <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

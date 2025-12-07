import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineSend, MdOutlineEdit } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa";
import  patientImg  from "./image/image.png"

export default function Treatment() {
  return (
    <div className="p-6 space-y-8 max-w-screen-xl mx-auto">

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold">Treatment Management</h1>
        <p className="text-gray-500 text-lg">
          Manage treatment plans and activities for your patients.
        </p>
      </div>

      {/* Patient card with blue outline like in the design */}
      <div className="border-2 border-blue-300 rounded-2xl p-1">
        <div className="bg-treat-bg-Gray rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
  src={patientImg}
  alt="patient"
  className="w-20 h-20 rounded-full object-cover shadow-sm"
/>
            <div>
              <h2 className="font-semibold text-xl">Emily Williams</h2>
              <p className="text-gray-500 mt-1">Patient ID: <span className="font-medium">#PAT-2025-0123</span></p>
            </div>
          </div>

          <Link
            to="#"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m12 0l-4 4m4-4l-4-4" />
            </svg>
            View Full Profile
          </Link>
        </div>
      </div>

      {/* Quick Actions box with blue outline */}
      <div className="border-2 border-blue-300 rounded-2xl p-1">
        <div className="bg-treat-bg-Gray rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <p className="text-gray-500 text-sm mt-1">Select an action to proceed with the patient's treatment plan.</p>
          </div>

          <div className=" grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-[640px]:grid-cols-1">
            {/* Action card */}
            <ActionCard icon={<MdOutlineSend size={20} />} title="Send Treatment Plan" />
            <ActionCard icon={<MdOutlineEdit size={20} />} title="Modify Prescription" />
            <ActionCard icon={<FaWheelchair size={20} />} title="Refer For Physical Therapy" />
            <ActionCard icon={<FaNotesMedical size={20} />} title="Add Medical Instructions" />
          </div>
        </div>
      </div>

    </div>
  );
}

/* small sub-component for action cards */
function ActionCard({ icon, title }) {
  return (
    <button className="flex items-center gap-4 border-blue-300 border bg-white rounded-xl p-4 hover:shadow-md  duration-150 focus:outline-none">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-medium">{title}</p>
      </div>
    </button>
  );
}

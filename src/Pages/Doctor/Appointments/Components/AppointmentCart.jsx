import React from "react";
import { Link } from "react-router-dom";

export default function AppointmentCart({ info: { name, age, status, date, time, type } }) {
  const isCompleted = status === "completed";

  return (
    <div className="px-2 py-4 rounded-2xl space-y-4 gradient-border">
      <div className="bg-white rounded-[17px] p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={"/fluent_patient-20-regular.svg"}
              alt={"patient"}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">{name}</h2>
              <p className="text-[#404040E0]">{`${age} years old`}</p>
            </div>
          </div>

          {/* Status Badge */}
          <p
            className={`py-[0.2rem] px-3 rounded-xl text-sm text-white font-semibold ${
              status === "New Patient"
                ? "bg-[#F59F00]"
                : status === "Urgent"
                ? "bg-red-500"
                : status === "Follow-up"
                ? "bg-[#009947A1]"
                : status === "completed"
                ? "bg-[#8F8F8F]"
                : "bg-gray-200 text-black"
            }`}
          >
            {status}
          </p>
        </div>

        {/* Details */}
        <div className="pl-6 space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary-gray-50 rounded-full p-1 flex items-center justify-center w-5 h-5">
              <img src="/circum_calendar.svg" alt="" className="w-3 h-3" />
            </div>
            <p className="text-[#404040E0]">{date}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary-gray-50 rounded-full p-1 flex items-center justify-center w-5 h-5">
              <img src="/mdi-light_clock.svg" alt="" className="w-3 h-3" />
            </div>
            <p className="text-[#404040E0]">{time}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary-gray-50 rounded-full p-1 flex items-center justify-center w-5 h-5">
              <img src="/fluent_check-24-regular.svg" alt="" className="w-3 h-3" />
            </div>
            <p className="text-[#404040E0]">{type}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center flex-wrap justify-between gap-4 ">
          <Link
            to={"#"}
            className="btn bg-primary-blue text-white shadow-lg py-2 px-4  border-none"
          >
            View Details
          </Link>

          {isCompleted ? (
            <Link
              to={"#"}
              className="btn bg-primary-gray-50 text-black shadow-lg py-2 px-4  border-none"
            >
              Add Diagnosis
            </Link>
          ) : (
            <>
              <Link
                to={"#"}
                className="btn bg-primary-gray-50 text-black shadow-lg py-2 px-4 border-none "
              >
                Add Notes
              </Link>
              <button className="btn bg-primary-gray-50 text-red-500 shadow-lg py-2 px-4 border-none">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

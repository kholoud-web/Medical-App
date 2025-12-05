import React from "react";
import { IoWarningOutline } from "react-icons/io5";

function WarningCard({ title = "Final Results: Conflict Found", description }) {
  return (
    <div className="w-full !bg-[rgba(240,240,240,0.5)] p-6 rounded-xl border border-blue-300 shadow-sm">
      <div className="flex gap-2 items-center mb-3">
        <IoWarningOutline size={25} className="text-red-500" />
        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">{description}</p>
    </div>
  );
}

export default WarningCard;

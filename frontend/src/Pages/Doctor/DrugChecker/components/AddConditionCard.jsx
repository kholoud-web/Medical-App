import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa6";

function AddConditionCard({ placeholder = "Diabetes, Asthma, ..." }) {
  return (
    <div className="w-full !bg-[rgba(240,240,240,0.5)] p-6 rounded-xl border border-blue-300 shadow-sm">
      <h2 className="font-semibold text-xl text-primary-black mb-1">Add New Condition</h2>
      <p className="text-sm text-gray-500 mb-5">
        Enter another condition to check for new conflicts.
      </p>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 border bg-white border-blue-300 rounded-lg px-4 py-3 w-full cursor-text">
          <IoAddOutline size={20} className="text-blue-600" />
          <input
            type="text"
            placeholder={placeholder}
            className="outline-none text-sm w-full text-blue-600 placeholder-blue-400"
          />
        </div>

        <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
          <FaClipboardCheck size={18} />
          Check
        </button>
      </div>
    </div>
  );
}

export default AddConditionCard;

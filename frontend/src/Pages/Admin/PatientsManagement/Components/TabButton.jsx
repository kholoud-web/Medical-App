import React from "react";

const TabButton = ({ active, icon, label, badge ,onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`pb-3 font-semibold flex items-center gap-2 ${
        active
          ? "text-[#4682FA] border-b-2 border-blue-600"
          : "text-[#505050] hover:text-gray-600 transition"
      }`}
    >
      <i className={`fa-solid ${icon}`}></i> {label}
      {badge && (
        <span className="bg-red-100 text-red-500 text-[10px] px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

export default TabButton;

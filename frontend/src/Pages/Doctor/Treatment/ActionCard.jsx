import React from "react";

export default function ActionCard({ icon, title, onClick  }) {
  return (
    <button
    onClick={onClick}
      className="
        w-full
        h-[120px]
        flex items-center
        border border-blue-300
        bg-treat-bg-Gray
        rounded-xl
        px-8
        hover:shadow-md
        duration-150
      "
    >
      <div className="flex items-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50">
          {icon}
        </div>
        <p className="font-semibold text-gray-800 text-lg">
          {title}
        </p>
      </div>
    </button>
  );
}

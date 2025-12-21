import React from "react";
import Card from "@/components/Common/Card";

function CustomFilter({ options = []  , handleClick}) {
  return (
<div className="flex gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`px-4 py-1 w-32 text-sm rounded-full transition-colors
            ${
              option.active
                ? "bg-blue-500 text-white"
                : "border border-blue-500 text-blue-500 hover:bg-blue-50"
            }`}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
}

export default CustomFilter;

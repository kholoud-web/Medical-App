import React from "react";

function PrimButton({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`
        outline-none
        rounded-lg
        bg-primary-blue
        text-center
        font-semibold
        text-primary-white
        p-1
        transition-all
        duration-200
        ease-in-out
        hover:bg-primary-blue/90
        hover:shadow-md
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimButton;

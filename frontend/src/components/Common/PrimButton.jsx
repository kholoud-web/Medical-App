import React from 'react'

function PrimButton({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`outline-none rounded-3xl bg-primary-blue text-center font-semibold text-primary-white p-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimButton

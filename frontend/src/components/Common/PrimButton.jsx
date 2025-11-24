import React from 'react'

function PrimButton({children , className=""}) {
  return (
    <button className ={`outline-none rounded-3xl bg-primary-blue text-center font-semibold text-primary-white p-1 ${className}`}>
        {children}
    </button> 
  )
}

export default PrimButton
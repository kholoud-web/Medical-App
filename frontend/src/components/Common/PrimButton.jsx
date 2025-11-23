import React from 'react'

function PrimButton({children , className=""}) {
  return (
    <button className ={`outline-none rounded-3xl bg-bg-blue text-center font-semibold text-primary-white ${className}`}>
        {children}
    </button> 
  )
}

export default PrimButton
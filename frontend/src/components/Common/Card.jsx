import React from 'react'

function Card({children , classname =""}) {
  return (
    <div className='bg-gradient-border p-[2px] rounded-[20px]'>
            <div className='bg-white rounded-[20px]'>
        <div className={`bg-[rgba(240,240,240,0.5)] rounded-[20px] p-[2px] ${classname} `}>
            {children}
        </div>
        </div>  
    </div>


  )
}

export default Card
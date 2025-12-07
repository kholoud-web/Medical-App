import React from 'react'

function MedicalRow() {
  return (
   <div className="flex items-center justify-between w-full mt-1 mb-1 ">
                <div className="flex gap-2 ">
              <div className="flex justify-center items-center">
                <img src="/avatar.svg" className="rounded-full"></img>
              </div>
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg">Mohamed Ali</h1>

                </div>
                
            </div>
              <div className=" font-medium text-sm">MRI Result Review</div>
              <div className=" font-medium text-sm">05:00 PM</div>
              <button className="text-[#009947] font-semibold text-lg">Completed</button>
            
    </div>
  )
}

export default MedicalRow
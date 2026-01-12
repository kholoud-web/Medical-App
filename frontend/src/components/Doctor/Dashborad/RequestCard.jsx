import React from 'react'
import PrimButton from '@/components/Common/PrimButton'

function RequestCard() {
  return (
            <div className="flex items-center justify-between w-full mt-1 mb-1 ">
            <div className="flex gap-2 ">
              <div className="flex justify-center items-center">
                <img src="/avatar.svg" className="rounded-full"></img>
              </div>

              <div>
                <h1 className="font-semibold text-lg">Mohamed Ali</h1>
                <h3 className="font-normal text-xs text-neutral-700">Urgent Consultation</h3>
                <h3 className="font-normal text-xs text-neutral-700">Oct 9 ,2025 01:00 PM</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <PrimButton className="!bg-green-500 px-6">Accept</PrimButton>
              <PrimButton className="bg-red-500 px-6">Decline</PrimButton>
            </div>
            
          </div>
  )
}

export default RequestCard
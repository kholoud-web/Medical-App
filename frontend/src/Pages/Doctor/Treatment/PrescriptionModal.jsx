import React from "react";
import patientImg from "./image/image.png";
import IconHand from "./icons/Hand With a Pill.svg";

export default function PrescriptionModal({ onClose }) {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white  w-[660px] max-h-[90vh] shadow-xl flex flex-col overflow-hidden">
        
        <div className="p-8 pb-4 flex-shrink-0">
          <h2 className="text-3xl font-bold text-gray-800">Add Prescription</h2>
          <p className="text-gray-400 mt-1">Edit active medications for current treatment cycle</p>
        </div>

       
        <div className="overflow-y-auto px-8 mb-6 flex-1">
    
          <div className="bg-[#B2E3E3] p-4 flex items-center gap-4 rounded-t-2xl">
            <img src={patientImg} alt="Emily" className="w-14 h-14 rounded-full object-cover border-2 border-white" />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl text-gray-800">Emily Williams</span>
              <span className="text-gray-500 text-sm">Patient ID: #PAT-2025-0123</span>
            </div>
          </div>

          <div className="p-6 space-y-5">
        
            <div className="flex items-center gap-3 p-3 border rounded-xl bg-white">
              <div className="bg-blue-100 p-2 rounded-full">
                <img src={IconHand} alt="pill" className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-700">Fastum</span>
            </div>

          
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Dosage</label>
                <input type="text" placeholder="20 mg" className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-blue-300" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Frequency</label>
                <select className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-blue-300">
                  <option>Once daily morning</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Duration</label>
                <select className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-blue-300">
                  <option>3 months</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Instructions</label>
              <input type="text" placeholder="Take with food to avoid stomach upset." className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-blue-300" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Notes</label>
              <textarea placeholder="Add optional notes for medical records" className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-blue-300 h-20 resize-none" />
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 flex-shrink-0 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Last Modified by doctor Ahmed on Dec 15</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-10 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button className="px-10 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-200">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

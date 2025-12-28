import React from "react";
import patientImg from "./image/image.png";
import IconHand from "./icons/Hand With a Pill.svg";

export default function PrescriptionModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full sm:w-[560px] md:w-[620px] max-h-[90vh] shadow-xl flex flex-col overflow-hidden rounded-xl">

        <div className="p-5 sm:p-8 pb-4 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Add Prescription</h2>
          <p className="text-gray-400 mt-1 text-sm">Edit active medications for current treatment cycle</p>
        </div>

        <div className="overflow-y-auto px-5 sm:px-8 mb-6 flex-1">

          <div className="bg-[#B2E3E3] p-4 flex items-center gap-4 rounded-t-2xl">
            <img src={patientImg} className="w-12 h-12 rounded-full border-2 border-white" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span className="font-bold text-lg sm:text-xl">Emily Williams</span>
              <span className="text-gray-500 text-xs sm:text-sm">Patient ID: #PAT-2025-0123</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 p-3 border rounded-xl bg-white">
              <div className="bg-blue-100 p-2 rounded-full">
                <img src={IconHand} className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-700">Fastum</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Dosage" placeholder="20 mg" />
              <Select label="Frequency" />
              <Select label="Duration" />
            </div>

            <Input label="Instructions" placeholder="Take with food to avoid stomach upset." />
            <Textarea label="Notes" placeholder="Add optional notes for medical records" />
          </div>
        </div>

        <div className="px-5 sm:px-8 pb-6 flex-shrink-0 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-500 text-xs sm:text-sm">Last Modified by doctor Ahmed on Dec 15</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2 border-2 border-gray-300 rounded-xl text-sm">Cancel</button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-xl text-sm">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-700 text-sm">{label}</label>
      <input placeholder={placeholder} className="w-full p-2 border rounded-xl bg-gray-50" />
    </div>
  );
}

function Select({ label }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-700 text-sm">{label}</label>
      <select className="w-full p-2 border rounded-xl bg-gray-50">
        <option>Once daily</option>
      </select>
    </div>
  );
}

function Textarea({ label, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-700 text-sm">{label}</label>
      <textarea placeholder={placeholder} className="w-full p-2 border rounded-xl bg-gray-50 h-20 resize-none" />
    </div>
  );
}

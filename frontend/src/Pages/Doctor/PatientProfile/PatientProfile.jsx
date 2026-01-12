import React from "react";
import patientImg from "../Treatment/image/image.png";
import xray1 from "./image/xray1.jpg";
import xray2 from "./image/xray2.jpg";
import xray3 from "./image/xray3.jpg";
import { LampDesk, LampDeskIcon } from "lucide-react";
import { LuLampDesk } from "react-icons/lu";



export default function PatientProfile() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* ---------------------- TITLE ---------------------- */}
      <h1 className="text-3xl font-bold text-center">Patient Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ---------------------- LEFT CARD ---------------------- */}
        <div className="bg-treat-bg-Gray rounded-xl border p-6 space-y-6 border-2 border-blue-300">

          {/* Patient Info */}
          <div className="text-center space-y-4">
            <img src={patientImg} className=" w-28 h-28 rounded-full mx-auto object-cover border-2 border-blue-500" />

            <h2 className="text-xl font-bold">Emily Williams</h2>
          </div>

          <div className="text-sm space-y-3">
            <p><span className="font-semibold">Gender :</span> Female</p>
            <p><span className="font-semibold">Phone Number :</span> +1 (555) 123-4567</p>
            <p><span className="font-semibold">Patient ID :</span> P-1001</p>
            <p><span className="font-semibold">Last Visit :</span> 2025-01-15</p>
          </div>

          {/* Follow-up Notes */}
          <div className="mt-4 ">
            <h3 className="font-bold text-lg mb-3">Follow-up Notes</h3>

            <div className="border-2 border-blue-300 rounded-xl p-4 mb-3">
              <p className="font-semibold mb-1">Dr. Chen — 12th Feb 2020</p>
              <p className="text-sm">
                Patient reported mild headaches. Blood pressure is stable. Continue medication.
              </p>
            </div>

            <div className="border-2 border-blue-300 rounded-xl p-4">
              <p className="font-semibold mb-1">Dr. Chen — 12th Feb 2020</p>
              <p className="text-sm">
                Patient reported mild headaches. Blood pressure is stable. Continue medication.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------- RIGHT SIDE — MEDICAL RECORDS + XRAY + TREATMENT ---------------------- */}
        <div className="md:col-span-2 space-y-6">

          {/* Medical Records */}
          <div className="bg-treat-bg-Gray  rounded-xl p-6 space-y-4 border-2 border-blue-300">
            <h2 className="text-xl font-bold">Medical Records</h2>

            <p><span className="font-semibold">Previous Diseases:</span> Diabetes, Blood Disorders</p>
            <p><span className="font-semibold">Allergies:</span> Milk, Penicillin</p>

            {/* Tests */}
            <h3 className="font-semibold mt-4">Tests</h3>

            <div className="flex flex-wrap gap-3">
  {Array(3).fill(0).map((_, i) => (
    <div key={i} className="border-2 border-blue-300 rounded-xl px-4 py-3 flex flex-col items-center w-50">

      <span className="font-semibold text-sm flex items-center gap-2">
        <LuLampDesk fill="#357ae9ff" color="#357ae9ff" size={36} />
        CT Scan - Full Body
      </span>

      <span className="text-xs text-gray-500">13th November 2025</span>
    </div>
  ))}
</div>

          </div>

          {/* X-Ray Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">X-Ray Images</h2>

            <div className="flex gap-4">
              <img src={xray1} className="w-28 h-28 rounded-xl" />
              <img src={xray2} className="w-28 h-28 rounded-xl" />
              <img src={xray3} className="w-28 h-28 rounded-xl" />

              <button className="w-28 h-28 rounded-lg bg-gray-100 flex items-center justify-center text-3xl font-bold">
                +
              </button>
            </div>
          </div>

          {/* Current Treatment Plan */}
          <div className="bg-treat-bg-Gray border-2 border-blue-300 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold">Current Treatment Plan</h2>

            <p className="text-sm">
              <span className="font-semibold">Doctor's Instructions:</span><br />
              Patient is to continue with the prescribed medication and monitor blood sugar levels twice daily.
              Follow-up in 2 weeks.
            </p>

            {/* Table */}
            <table className="w-full mt-4 ">
              <thead>
                <tr className="text-left text-sm">
                  <th className="py-2">Sessions</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className=" text-sm">
                  <td className="py-2">Heart Diseases</td>
                  <td>2025-01-15</td>
                  <td>3 Months</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

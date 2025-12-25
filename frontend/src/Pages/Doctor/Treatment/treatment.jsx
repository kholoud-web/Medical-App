import React, { useState } from "react";
import patientImg from "./image/image.png";
import TreatmentListicon from "./icons/Treatment List.svg";
import IconHand from "./icons/Hand With a Pill.svg";
import ActionCard from "./ActionCard";
import TreatmentPlanModal from "./TreatmentPlanModal";
import PrescriptionModal from "./PrescriptionModal";

export default function Treatment() {
  const [openPlan, setOpenPlan] = useState(false);
  const [openPrescription, setOpenPrescription] = useState(false);

  return (
    <div className="p-6 space-y-8 max-w-screen-xl mx-auto">

      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold">Treatment Management</h1>
        <p className="text-gray-500 text-lg">
          Manage treatment plans and activities for your patients.
        </p>
      </div>

      <div className="border-2 border-blue-300 rounded-2xl p-1">
        <div className="bg-treat-bg-Gray rounded-xl p-6 flex items-center">
          <div className="flex items-center gap-5">
            <img
              src={patientImg}
              alt="patient"
              className="w-20 h-20 rounded-full object-cover shadow-sm"
            />
            <div>
              <h2 className="font-semibold text-xl">Emily Williams</h2>
              <p className="text-gray-500 mt-1">
                Patient ID: <span className="font-medium">#PAT-2025-0123</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[1001px] h-[328px] border-2 border-blue-300 rounded-2xl p-1 overflow-hidden">
        <div className="bg-treat-bg-Gray rounded-xl h-full p-8">
          <div>
            <h3 className="text-xl font-semibold mt-4">Quick Actions</h3>
            <p className="text-gray-500 text-sm mt-4">
              Select an action to proceed with the patient's treatment plan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <ActionCard
              icon={<img src={TreatmentListicon} className="w-8 h-8" />}
              title="Add Treatment Plan"
              onClick={() => setOpenPlan(true)}
            />

            <ActionCard
              icon={<img src={IconHand} className="w-8 h-8" />}
              title="Add Prescription"
              onClick={() => setOpenPrescription(true)}
            />
          </div>
        </div>
      </div>

      {openPlan && <TreatmentPlanModal onClose={() => setOpenPlan(false)} />}
        {openPrescription && <PrescriptionModal onClose={() => setOpenPrescription(false)}/>}
    </div>
  );
}

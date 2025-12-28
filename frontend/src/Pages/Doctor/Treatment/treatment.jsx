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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-screen-xl mx-auto">

      {/* Page Title */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl font-extrabold">
          Treatment Management
        </h1>
        <p className="text-gray-500 text-sm sm:text-lg">
          Manage treatment plans and activities for your patients.
        </p>
      </div>

      {/* Patient Card */}
      <div className="border-2 border-blue-300 rounded-2xl p-1">
        <div className="bg-treat-bg-Gray rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">

          <img
            src={patientImg}
            alt="patient"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm"
          />

          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-lg sm:text-xl">
              Emily Williams
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Patient ID: <span className="font-medium">#PAT-2025-0123</span>
            </p>
          </div>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-4xl border-2 border-blue-300 rounded-2xl p-1 overflow-hidden">

        <div className="bg-treat-bg-Gray rounded-xl h-full p-4 sm:p-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-4">
              Quick Actions
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-4">
              Select an action to proceed with the patient's treatment plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            <ActionCard
              icon={<img src={TreatmentListicon} className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Add Treatment Plan"
              onClick={() => setOpenPlan(true)}
            />

            <ActionCard
              icon={<img src={IconHand} className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Add Prescription"
              onClick={() => setOpenPrescription(true)}
            />
          </div>
        </div>
      </div>

      {openPlan && <TreatmentPlanModal onClose={() => setOpenPlan(false)} />}
      {openPrescription && (
        <PrescriptionModal onClose={() => setOpenPrescription(false)} />
      )}
    </div>
  );
}

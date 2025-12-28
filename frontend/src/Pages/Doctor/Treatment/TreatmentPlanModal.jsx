import React from "react";


export default function TreatmentPlanModal({ onClose }) {
  return (
    <div className="fixed inset-0  flex items-center justify-center  backdrop-blur-sm">

    <div className="w-full sm:w-[560px] md:w-[620px] max-h-[90vh] bg-white rounded-xl overflow-hidden flex flex-col">



        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Treatment Plan</h2>
          
        </div>

        <div className="p-6 space-y-5 text-sm overflow-y-auto">

          <div className="grid grid-cols-2 gap-4">
            <InfoBox label="Doctor" value="Jelen Kaya" />
            <InfoBox label="Duration" value="12 weeks" />
          </div>

          <div>
            <p className="font-medium mb-2">Overview</p>
            <div className="border border-blue-300 rounded-xl p-4 text-gray-600 leading-relaxed">
              Targeted therapy combined with standard chemotherapy agents to
              maximize tumor reduction before scheduled surgery in Week 13.
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Key Medications</p>

            <MedItem name="Tamoxifen" desc="20 mg daily" />
            <MedItem name="Tamoxifen" desc="20 mg daily" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoBox label="Hydration" value="2.5 L water daily" />
            <InfoBox label="Restrictions" value="No Grapefruit" />
          </div>

          <a href="#" className="text-blue-600 font-medium block">Download PDF</a>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-start gap-3 border-t px-6 py-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Send To Patient
          </button>
          <button onClick={onClose} className="border px-5 py-2 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


function InfoBox({ label, value }) {
  return (
    <div className="border border-blue-300 rounded-xl p-4">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}

function MedItem({ name, desc }) {
  return (
    <div className="border border-blue-300 rounded-xl p-4 flex items-center justify-between mb-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-gray-500 text-xs mt-1">{desc}</p>
      </div>
      <span className="text-gray-400 text-xl">{">"}</span>
    </div>
  );
}

import React, { useState } from "react";

export default function DiagnosisDetails() {
  const [symptoms] = useState([
    "Increased thirst and frequent urination",
    "Unexplained weight loss",
    "Fatigue and weakness",
    "Blurred vision",
    "Slow-healing sores",
  ]);

  const [clinicalFindings] = useState([
    { label: "Fasting Blood Glucose", value: "145 mg/dL", note: "(elevated)" },
    { label: "HbA1c", value: "7.2%", note: "(above normal range)" },
    { label: "BMI", value: "31.5", note: "(obese)" },
    { label: "Blood Pressure", value: "138/88 mmHg", note: "(slightly elevated)" },
  ]);

  const [medications] = useState([
    "Metformin 500mg – Twice daily with meals",
    "Glipizide 5mg – Once daily before breakfast",
    "Atorvastatin 10mg – Once daily at bedtime",
  ]);

  return (
    <div className="bg-treat-bg-Gray p-6 rounded-xl shadow-lg border border-blue-200">
      <h2 className="text-md font-semibold text-gray-800">Diagnosis Details</h2>
      <p className="text-sm text-gray-600 mb-4">Type 2 Diabetes Mellitus</p>

      <div className="flex justify-between gap-10">
        {/* Symptoms */}
        <div className="w-1/2">
          <h3 className="text-md font-semibold text-blue-500 mb-2">Symptoms</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Clinical Findings */}
        <div className="w-1/2">
          <h3 className="text-md font-semibold text-blue-500 mb-2">
            Clinical Findings
          </h3>
          <div className="text-gray-700 space-y-1">
            {clinicalFindings.map((f, i) => (
              <p key={i}>
                <span className="font-medium">{f.label}:</span>{" "}
                {f.value}{" "}
                <span className="text-sm text-gray-500">{f.note}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-blue-500 mb-1">
          Suggested Medications
        </h3>
        <ul className="text-gray-700 space-y-1">
          {medications.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

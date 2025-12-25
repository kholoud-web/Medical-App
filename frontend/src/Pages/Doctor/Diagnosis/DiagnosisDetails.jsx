import React, { useState } from "react";

export default function DiagnosisDetails() {
  const [editMode, setEditMode] = useState(false);

  const [symptoms, setSymptoms] = useState([
    "Increased thirst and frequent urination",
    "Unexplained weight loss",
    "Fatigue and weakness",
    "Blurred vision",
    "Slow-healing sores",
  ]);

  const [clinicalFindings, setClinicalFindings] = useState([
    { label: "Fasting Blood Glucose", value: "145 mg/dL", note: "(elevated)" },
    { label: "HbA1c", value: "7.2%", note: "(above normal range)" },
    { label: "BMI", value: "31.5", note: "(obese)" },
    { label: "Blood Pressure", value: "138/88 mmHg", note: "(slightly elevated)" },
  ]);

  const [medications, setMedications] = useState([
    "Metformin 500mg – Twice daily with meals",
    "Glipizide 5mg – Once daily before breakfast",
    "Atorvastatin 10mg – Once daily at bedtime",
  ]);

  return (
    <div className="bg-treat-bg-Gray p-6 rounded-xl shadow-lg border border-blue-200">
      <h2 className="text-md font-semibold text-gray-800">Diagnosis Details</h2>
      <p className="text-sm text-gray-600 mb-4">Type 2 Diabetes Mellitus</p>

      <div className="flex justify-between gap-10">

        <div className="w-1/2">
          <h3 className="text-md font-semibold text-blue-500 mb-2">Symptoms</h3>

          {!editMode ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {symptoms.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2">
              {symptoms.map((s, i) => (
                <input
                  key={i}
                  className="w-full border rounded p-1 text-gray-700"
                  value={s}
                  onChange={(e) => {
                    const updated = [...symptoms];
                    updated[i] = e.target.value;
                    setSymptoms(updated);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-1/2">
          <h3 className="text-md font-semibold text-blue-500 mb-2">
            Clinical Findings
          </h3>

          {!editMode ? (
            <div className="text-gray-700 space-y-1">
              {clinicalFindings.map((f, i) => (
                <p key={i}>
                  <span className="font-medium">{f.label}:</span>{" "}
                  {f.value}{" "}
                  <span className="text-sm text-gray-500">{f.note}</span>
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {clinicalFindings.map((f, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <input
                    className="border rounded p-1 text-gray-700"
                    value={f.label}
                    onChange={(e) => {
                      const updated = [...clinicalFindings];
                      updated[i].label = e.target.value;
                      setClinicalFindings(updated);
                    }}
                  />
                  <input
                    className="border rounded p-1 text-gray-700"
                    value={f.value}
                    onChange={(e) => {
                      const updated = [...clinicalFindings];
                      updated[i].value = e.target.value;
                      setClinicalFindings(updated);
                    }}
                  />
                  <input
                    className="border rounded p-1 text-gray-700"
                    value={f.note}
                    onChange={(e) => {
                      const updated = [...clinicalFindings];
                      updated[i].note = e.target.value;
                      setClinicalFindings(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold text-blue-500 mb-1">
          Suggested Medications
        </h3>

        {!editMode ? (
          <ul className="text-gray-700 space-y-1">
            {medications.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2">
            {medications.map((m, i) => (
              <input
                key={i}
                className="w-full border rounded p-1 text-gray-700"
                value={m}
                onChange={(e) => {
                  const updated = [...medications];
                  updated[i] = e.target.value;
                  setMedications(updated);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4 gap-3">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-1.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-1.5 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-1.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}

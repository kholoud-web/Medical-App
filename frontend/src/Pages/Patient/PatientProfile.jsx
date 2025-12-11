import React from "react";
import { FiPlus } from "react-icons/fi";
import Card from "@/components/Common/Card";

const patient = {
  name: "Emily Williams",
  gender: "Female",
  phone: "+1 (555) 123-4567",
  id: "P-1031",
  lastVisit: "2025-01-15",
  records: {
    diseases: "Diabetes, Blood Disorders",
    allergies: "Milk, Penicillin",
  },
  tests: [
    { label: "CT Scan - Full Body", date: "13th November 2025" },
    { label: "CT Scan - Full Body", date: "13th November 2025" },
    { label: "CT Scan - Full Body", date: "13th November 2025" },
  ],
  followUps: [
    {
      title: "Dr. Chen - 12th Feb 2020",
      notes:
        "Patient reported mild headaches. Blood pressure is stable. Continue medication.",
    },
    {
      title: "Dr. Chen - 12th Feb 2020",
      notes:
        "Patient reported mild headaches. Blood pressure is stable. Continue medication.",
    },
  ],
  plan: {
    instructions:
      "Patient is to continue with the prescribed medication and monitor blood sugar levels twice daily. Follow-up in 2 weeks.",
    disease: "Heart Diseases",
    startDate: "2025-01-15",
    duration: "3 Months",
  },
};

const mockXrays = [
  "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300",
  "bg-gradient-to-br from-sky-200 via-white to-slate-200",
  "bg-gradient-to-br from-indigo-200 via-white to-amber-100",
  "bg-gradient-to-br from-rose-200 via-white to-blue-200",
];

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 text-sm text-neutral-700">
      <span className="font-semibold text-neutral-800 min-w-[90px]">
        {label}
      </span>
      <span className="text-neutral-700">{value}</span>
    </div>
  );
}

function Tag({ label, sub }) {
  return (
    <div className="rounded-xl border border-primary-blue/20 px-3 py-2 bg-white shadow-sm">
      <p className="text-[11px] font-semibold text-primary-blue uppercase tracking-wide">
        {label}
      </p>
      <p className="text-xs text-neutral-600">{sub}</p>
    </div>
  );
}

export default function PatientProfile() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-neutral-800">
            Patient Profile
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card classname="p-6 flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-blue/20 to-primary-blue/5 flex items-center justify-center text-xl font-bold text-primary-blue">
              EW
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-neutral-800 text-lg">
                {patient.name}
              </p>
              <p className="text-sm text-neutral-500">{patient.gender}</p>
            </div>
            <div className="w-full space-y-3">
              <InfoRow label="Phone Number :" value={patient.phone} />
              <InfoRow label="Patient ID :" value={patient.id} />
              <InfoRow label="Last Visit :" value={patient.lastVisit} />
            </div>
          </Card>

          <Card classname="lg:col-span-2 p-6 space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-800">
                Medical Records
              </h2>
              <p className="text-sm text-neutral-700">
                Previous Diseases: {patient.records.diseases}
              </p>
              <p className="text-sm text-neutral-700">
                Allergies: {patient.records.allergies}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-800">Tests</p>
              <div className="flex flex-wrap gap-3">
                {patient.tests.map((test, idx) => (
                  <Tag key={idx} label={test.label} sub={test.date} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">
              X-Ray Images
            </h2>
            <button className="btn flex items-center gap-2">
              <FiPlus size={16} />
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockXrays.map((bg, idx) => (
              <div
                key={idx}
                className={`h-32 rounded-2xl border border-primary-blue/15 shadow-sm overflow-hidden ${bg}`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card classname="p-5 space-y-3">
            <h2 className="text-lg font-semibold text-neutral-800">
              Follow-up Notes
            </h2>
            <div className="space-y-3">
              {patient.followUps.map((note) => (
                <div
                  key={note.title}
                  className="rounded-xl border border-primary-blue/20 bg-white p-3 shadow-sm"
                >
                  <p className="text-sm font-semibold text-neutral-800">
                    {note.title}
                  </p>
                  <p className="text-sm text-neutral-700 leading-6">
                    {note.notes}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card classname="lg:col-span-2 p-5 space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-800">
                Current Treatment Plan
              </h2>
              <p className="text-sm text-neutral-700 leading-6">
                Doctor&apos;s Instructions:
              </p>
              <p className="text-sm text-neutral-700 leading-6">
                {patient.plan.instructions}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white border border-primary-blue/20 p-3 shadow-sm">
                <p className="text-xs font-semibold text-primary-blue uppercase tracking-wide">
                  Disease
                </p>
                <p className="text-sm text-neutral-800">{patient.plan.disease}</p>
              </div>
              <div className="rounded-xl bg-white border border-primary-blue/20 p-3 shadow-sm">
                <p className="text-xs font-semibold text-primary-blue uppercase tracking-wide">
                  Start Date
                </p>
                <p className="text-sm text-neutral-800">
                  {patient.plan.startDate}
                </p>
              </div>
              <div className="rounded-xl bg-white border border-primary-blue/20 p-3 shadow-sm">
                <p className="text-xs font-semibold text-primary-blue uppercase tracking-wide">
                  Duration
                </p>
                <p className="text-sm text-neutral-800">
                  {patient.plan.duration}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

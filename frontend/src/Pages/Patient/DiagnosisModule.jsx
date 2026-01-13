import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import PrimButton from "@/components/Common/PrimButton";

const diagnosisResults = [
  { label: "Spondylosis", value: 4.7 },
  { label: "Complex Regional Pain Syndrome", value: 95.9 },
];

export default function DiagnosisModule() {
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-neutral-800 flex justify-center">
      <div className="w-full max-w-md px-4 py-10 space-y-8">
        <section className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            chat
          </p>
          <div className="rounded-lg overflow-hidden bg-white shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 px-4 py-2 text-white bg-primary-blue">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                <FiUploadCloud size={12} />
              </span>
              <span className="text-xs font-semibold">Medical AI Bot</span>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[11px] text-neutral-400">Question 1</p>
              <div className="rounded-md border border-neutral-200 bg-[#f5f7fb] px-3 py-2 text-xs text-neutral-700 text-center">
                Do you have back pain?
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm"
                >
                  <span className="w-2 h-2 bg-white rounded-full" />
                  Yes
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm"
                >
                  <span className="w-2 h-2 bg-white rounded-full" />
                  No
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            result
          </p>
          <div className="rounded-lg overflow-hidden bg-white shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 px-4 py-2 text-white bg-primary-blue">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                <FiUploadCloud size={12} />
              </span>
              <span className="text-xs font-semibold">Medical AI Bot</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-700">
                  Diagnosis Results
                </p>
                <p className="text-[11px] text-neutral-400">
                  Based on your symptoms, here are the most likely conditions:
                </p>
              </div>

              <div className="space-y-3">
                {diagnosisResults.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-neutral-600">
                      <span className="font-semibold text-primary-blue">
                        {item.label}
                      </span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-neutral-200">
                      <div
                        className="h-full rounded-full bg-primary-blue"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] text-amber-800">
                Important: This is an informational tool only and not a final
                diagnosis. Please consult with a healthcare professional for
                proper medical advice.
              </div>

              <div className="space-y-2">
                <PrimButton className="w-full py-2 text-xs">Restart</PrimButton>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-xs font-semibold border rounded-md border-neutral-300 text-neutral-700"
                >
                  Send to doctor
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

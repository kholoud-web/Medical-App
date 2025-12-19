import React from "react";
import dayjs from "dayjs";
import {
  FiActivity,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiCpu,
  FiDroplet,
  FiFileText,
  FiFolder,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

const followUpQuestions = [
  "What are the next steps after this diagnosis?",
  "How can I monitor my skin for any changes?",
  "Can you explain the treatment options available for Melanoma?",
];

const navSections = [
  {
    label: "Menu",
    items: [
      { label: "Dashboard", icon: FiHome },
      { label: "Diagnosis Module", icon: FiActivity },
      { label: "AI Diagnosis Result", icon: FiCpu, active: true },
      { label: "Drug Checker", icon: FiDroplet },
      { label: "Physiotherapy", icon: FiFileText },
    ],
  },
  {
    label: "Patient",
    items: [
      { label: "Inquiries", icon: FiMessageSquare },
      { label: "Medical Files", icon: FiFolder },
    ],
  },
  {
    label: "General",
    items: [
      { label: "Settings", icon: FiSettings },
      { label: "Help", icon: FiHelpCircle },
      { label: "Logout", icon: FiLogOut, danger: true },
    ],
  },
];

const diagnosis = {
  name: "Melanoma",
  confidence: 92,
  description: [
    "Melanoma is a type of skin cancer that develops when melanocytes (the cells that give the skin its tan or brown color) start to grow out of control. It is less common than other skin cancers, but is more dangerous because it is much more likely to spread to other parts of the body if not caught and treated early.",
    "The first sign of melanoma is often a new mole or a change in an existing mole. It's important to be aware of the ABCDEs of melanoma to spot potential signs: Asymmetry, Border, Color, Diameter, and Evolving.",
  ],
};

function ConfidenceBadge({ value }) {
  return (
    <div
      aria-label={`Confidence level ${value}%`}
      className="relative flex items-center justify-center"
    >
      <div
        className="h-16 w-16 rounded-full flex items-center justify-center shadow-[0_6px_18px_rgba(56,104,200,0.12)]"
        style={{
          background: `conic-gradient(#3868c8 0% ${value}%, #dce7ff ${value}% 100%)`,
        }}
      >
        <div className="h-12 w-12 rounded-full bg-white border border-[#dce7ff] flex items-center justify-center text-primary-blue font-semibold text-sm">
          {value}%
        </div>
      </div>
    </div>
  );
}

function SidebarNav() {
  return (
    <aside className="hidden lg:block">
      <div className="rounded-[22px] bg-white border border-primary-blue/10 shadow-sm p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-blue to-[#1f3a70] text-primary-white flex items-center justify-center font-semibold text-lg shadow-sm">
            AI
          </div>
          <div>
            <p className="font-semibold text-neutral-800">Diagnosis</p>
            <p className="text-xs text-neutral-500">Patient Portal</p>
          </div>
        </div>

        {navSections.map((section) => (
          <div
            key={section.label}
            className="space-y-2 pt-2 border-t border-primary-blue/10 first:pt-0 first:border-none"
          >
            <p className="text-[11px] font-semibold text-neutral-400 tracking-wide uppercase">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary-blue text-primary-white shadow-sm"
                      : item.danger
                        ? "text-red-500 hover:bg-red-50"
                        : "text-neutral-700 hover:bg-primary-blue/10"
                  }`}
                  aria-current={item.active ? "page" : undefined}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AiDiagnosisResult() {
  const formattedDate = dayjs("2025-11-18").format("dddd, MMMM D, YYYY");

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <SidebarNav />

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-white border border-primary-blue/10 shadow-sm px-5 py-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-800">
                  Good Morning, Ahmed
                </p>
                <p className="text-xs text-neutral-500">{formattedDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-primary-blue/80 hover:text-primary-blue transition-colors">
                  <FiSettings size={20} />
                </button>
                <button className="text-primary-blue/80 hover:text-primary-blue transition-colors">
                  <FiBell size={20} />
                </button>
                <div className="flex items-center gap-2 rounded-full bg-primary-white border border-primary-blue/20 px-3 py-1 shadow-sm">
                  <FaRegUserCircle className="text-primary-blue/80" size={22} />
                  <span className="text-sm font-semibold text-neutral-700">
                    Ahmed Ahmed
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-primary-blue/15 rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 lg:p-7 space-y-6">
              <div className="text-center space-y-1">
                <h1 className="text-3xl font-semibold text-neutral-900">
                  AI Diagnosis Results
                </h1>
                <p className="text-sm text-neutral-500 max-w-3xl mx-auto">
                  This is a preliminary diagnosis provided by our AI model.
                  Please consult with a healthcare professional for confirmation
                  and personalized recommendations.
                </p>
              </div>

              <Card classname="w-full p-5 lg:p-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-700">
                      Diagnosis Name
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {diagnosis.name}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <p className="text-sm font-semibold text-neutral-700">
                      Confidence Level
                    </p>
                    <ConfidenceBadge value={diagnosis.confidence} />
                  </div>
                </div>
              </Card>

              <Card classname="w-full p-5 lg:p-6 space-y-3">
                <h2 className="text-lg font-semibold text-neutral-800">
                  Condition Description
                </h2>
                {diagnosis.description.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 12)}
                    className="text-sm leading-6 text-neutral-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </Card>

              <Card classname="w-full p-5 lg:p-6 space-y-4">
                <h2 className="text-lg font-semibold text-neutral-800">
                  Follow Up Questions
                </h2>
                <div className="space-y-2">
                  {followUpQuestions.map((question) => (
                    <div
                      key={question}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm border border-primary-blue/15"
                    >
                      <p className="text-sm text-neutral-700">{question}</p>
                      <FiChevronDown className="text-primary-blue" />
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-3xl border border-primary-blue text-primary-blue bg-white shadow-[0_8px_20px_rgba(56,104,200,0.08)] hover:bg-primary-blue/5 transition">
                  Select Doctor
                </button>
                <PrimButton className="w-full sm:w-auto px-6 py-3 text-sm shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition">
                  <span className="flex items-center justify-center gap-2">
                    Go To Treatment
                    <FiChevronRight size={16} />
                  </span>
                </PrimButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiDiagnosisResult;

import React from "react";
import dayjs from "dayjs";
import { FiBell, FiChevronDown, FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

const followUpQuestions = [
  "What are the next steps after this diagnosis?",
  "How can I monitor my skin for any changes?",
  "Can you explain the treatment options available for Melanoma?",
];

function ConfidenceBadge({ value }) {
  return (
    <div
      aria-label={`Confidence level ${value}%`}
      className="relative flex items-center justify-center"
    >
      <div
        className="h-16 w-16 rounded-full flex items-center justify-center"
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

function AiDiagnosisResult() {
  const formattedDate = dayjs("2025-11-18").format("dddd, MMMM D, YYYY");

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-[#f2f3f5] border border-primary-blue/10 rounded-2xl px-6 py-4 shadow-sm">
          <div>
            <p className="font-semibold text-sm text-neutral-700">
              Welcome back, Ahmed
            </p>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-primary-blue/80 hover:text-primary-blue">
              <FiSettings size={20} />
            </button>
            <button className="text-primary-blue/80 hover:text-primary-blue">
              <FiBell size={20} />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-white border border-primary-blue/20 px-3 py-1 shadow-sm">
              <FaRegUserCircle className="text-primary-blue/80" size={22} />
              <span className="text-sm font-semibold text-neutral-700">
                Ahmed Ahmed
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-primary-blue/15 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-800">
              AI Diagnosis Results
            </h1>
            <p className="text-sm text-neutral-500 max-w-3xl mx-auto">
              This is a preliminary diagnosis provided by our AI model. Please
              consult with a healthcare professional for confirmation and
              personalized recommendations.
            </p>
          </div>

          <Card classname="w-full p-5 md:p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-700">
                  Diagnosis Name
                </p>
                <p className="text-lg font-bold text-neutral-900">Melanoma</p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <p className="text-sm font-semibold text-neutral-700">
                  Confidence Level
                </p>
                <ConfidenceBadge value={92} />
              </div>
            </div>
          </Card>

          <Card classname="w-full p-5 md:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-neutral-800">
              Condition Description
            </h2>
            <p className="text-sm leading-6 text-neutral-600">
              Melanoma is a type of skin cancer that develops when melanocytes
              (the cells that give the skin its tan or brown color) start to
              grow out of control. It is less common than other skin cancers,
              but is more dangerous because it is much more likely to spread to
              other parts of the body if not caught and treated early.
            </p>
            <p className="text-sm leading-6 text-neutral-600">
              The first sign of melanoma is often a new mole or a change in an
              existing mole. It&apos;s important to be aware of the ABCDEs of
              melanoma to spot potential signs: Asymmetry, Border, Color,
              Diameter, and Evolving.
            </p>
          </Card>

          <Card classname="w-full p-5 md:p-6 space-y-4">
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

          <div className="flex justify-center pt-2">
            <PrimButton className="px-6 py-3 text-sm shadow-md hover:shadow-lg transition-shadow duration-200">
              Go To Treatment
            </PrimButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiDiagnosisResult;

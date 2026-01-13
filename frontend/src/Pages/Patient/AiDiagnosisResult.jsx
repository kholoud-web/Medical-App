import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";

const fallbackFollowUpQuestions = [
  "What are the next steps after this diagnosis?",
  "How can I monitor my skin for any changes?",
  "Can you explain the treatment options available for Melanoma?",
];

const fallbackDiagnosis = {
  name: "Melanoma",
  confidence: 92,
  description: [
    "Melanoma is a type of skin cancer that develops when melanocytes (the cells that give the skin its tan or brown color) start to grow out of control. It is less common than other skin cancers, but is more dangerous because it is much more likely to spread to other parts of the body if not caught and treated early.",
    "The first sign of melanoma is often a new mole or a change in an existing mole. It's important to be aware of the ABCDEs of melanoma to spot potential signs: Asymmetry, Border, Color, Diameter, and Evolving.",
  ],
  descriptionAr: [
    "الميلانوما نوع من سرطان الجلد ينشأ عندما تبدأ خلايا الميلانين بالنمو بشكل غير طبيعي. هو أقل شيوعًا من سرطانات الجلد الأخرى لكنه أكثر خطورة لأنه قد ينتشر بسرعة إذا لم يُكتشف ويُعالج مبكرًا.",
    "قد يظهر الميلانوما على شكل شامة جديدة أو تغير في شامة موجودة. من المهم معرفة علامات ABCDE: عدم التماثل، الحواف، اللون، القطر، والتغير.",
  ],
};

const normalizeDescription = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (item == null ? "" : String(item).trim()))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeQuestions = (questions) => {
  if (!Array.isArray(questions)) return [];
  return questions
    .map((item) => {
      if (typeof item === "string") {
        return { question: item, answer: null };
      }
      if (item && typeof item === "object") {
        const question = item.question ? String(item.question).trim() : "";
        if (!question) return null;
        return {
          question,
          answer: item.answer != null ? String(item.answer) : null,
        };
      }
      return null;
    })
    .filter(Boolean);
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

function AiDiagnosisResult() {
  const { t, language } = useLocale();
  const location = useLocation();
  const diagnosisState = location.state?.diagnosis || null;
  const normalizedDescription = normalizeDescription(
    diagnosisState?.diagnosisDescription
  );
  const normalizedFollowUp = normalizeQuestions(
    diagnosisState?.followUpQuestions
  );
  const rawConfidence = diagnosisState?.confidenceLevel;
  const confidenceValue =
    rawConfidence != null &&
    rawConfidence !== "" &&
    Number.isFinite(Number(rawConfidence))
      ? Number(rawConfidence)
      : fallbackDiagnosis.confidence;
  const diagnosisName =
    diagnosisState?.diagnosisName?.trim() || fallbackDiagnosis.name;
  const descriptionList =
    normalizedDescription.length > 0
      ? normalizedDescription
      : language === "ar"
      ? fallbackDiagnosis.descriptionAr
      : fallbackDiagnosis.description;
  const followUpList =
    normalizedFollowUp.length > 0
      ? normalizedFollowUp
      : fallbackFollowUpQuestions.map((question) => ({
          question,
          answer: null,
        }));

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-5xl px-4 lg:px-6 py-10">
        <div className="bg-white border border-primary-blue/15 rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 lg:p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-900">
              {t("diagnosis.title")}
            </h1>
            <p className="text-sm text-neutral-500 max-w-3xl mx-auto">
              {t("diagnosis.subtitle")}
            </p>
          </div>

          <Card classname="w-full p-5 lg:p-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-700">
                  {t("diagnosis.name")}
                </p>
                <p className="text-lg font-bold text-neutral-900">
                  {diagnosisName}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <p className="text-sm font-semibold text-neutral-700">
                  {t("diagnosis.confidence")}
                </p>
                <ConfidenceBadge value={confidenceValue} />
              </div>
            </div>
          </Card>

          <Card classname="w-full p-5 lg:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-neutral-800">
              {t("diagnosis.description.title")}
            </h2>
            {descriptionList.map((paragraph) => (
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
              {t("diagnosis.followup.title")}
            </h2>
            <div className="space-y-2">
              {followUpList.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl bg-white px-4 py-3 shadow-sm border border-primary-blue/15 space-y-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-neutral-700">{item.question}</p>
                    <FiChevronDown className="text-primary-blue" />
                  </div>
                  {item.answer ? (
                    <p className="text-xs text-neutral-500">{item.answer}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-3xl border border-primary-blue text-primary-blue bg-white shadow-[0_8px_20px_rgba(56,104,200,0.08)] hover:bg-primary-blue/5 transition">
              {t("diagnosis.selectDoctor")}
            </button>
            <PrimButton className="w-full sm:w-auto px-6 py-3 text-sm shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition">
              <span className="flex items-center justify-center gap-2">
                {t("diagnosis.goToTreatment")}
                <FiChevronRight size={16} />
              </span>
            </PrimButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiDiagnosisResult;

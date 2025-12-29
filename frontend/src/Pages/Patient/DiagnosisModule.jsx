import React, { useRef, useState } from "react";
import {
  FiAlertCircle,
  FiEdit3,
  FiFileText,
  FiImage,
  FiPlus,
  FiRotateCcw,
  FiUploadCloud,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";
import { createDiagnosis } from "@/api/diagnosisModule";

const uploads = [
  { id: 1, name: "skin-scan-front.png", size: "1.2 MB", status: "uploading" },
  { id: 2, name: "lab-report.pdf", size: "2.9 MB", status: "failed" },
  { id: 3, name: "derma-notes.pdf", size: "2.8 MB", status: "uploading" },
  { id: 4, name: "skin-scan-side.png", size: "1.2 MB", status: "uploading" },
];

const commonSymptoms = [
  "Muscle Stiffness",
  "Rheumatoid Arthritis",
  "Scoliosis",
  "Myositis",
  "Herniated Disc",
];

function UploadStatus({ status, t }) {
  if (status === "failed") {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600"
      >
        <FiRotateCcw size={12} />
        {t("diagnosis.module.uploading.retry")}
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary-blue">
      <span className="h-4 w-4 rounded-full border-2 border-primary-blue/40 border-t-primary-blue animate-spin" />
      {t("diagnosis.module.uploading.inProgress")}
    </span>
  );
}

export default function DiagnosisModule() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [isSymptomsModalOpen, setIsSymptomsModalOpen] = useState(false);
  const [customSymptom, setCustomSymptom] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const [caseDraft, setCaseDraft] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const maxCaseLength = 2000;

  const handleAddSymptom = () => {
    const value = customSymptom.trim() || selectedSymptom;
    if (!value) return;
    setSymptoms((prev) =>
      prev.includes(value) ? prev : [...prev, value]
    );
    setCustomSymptom("");
    setSelectedSymptom("");
    setIsSymptomsModalOpen(false);
  };

  const openCaseModal = () => {
    setCaseDraft(caseDescription);
    setIsCaseModalOpen(true);
  };

  const handleCaseSave = () => {
    setCaseDescription(caseDraft);
    setIsCaseModalOpen(false);
  };

  const handleFilesSelected = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setSelectedFiles((prev) => {
      const next = new Map(
        prev.map((file) => [`${file.name}-${file.size}-${file.lastModified}`, file])
      );
      files.forEach((file) => {
        next.set(`${file.name}-${file.size}-${file.lastModified}`, file);
      });
      return Array.from(next.values());
    });
    event.target.value = "";
  };

  const handleAnalyze = async () => {
    setSubmitError("");
    setSubmitSuccess("");

    if (!symptoms.length && !caseDescription.trim() && selectedFiles.length === 0) {
      setSubmitError("Add symptoms, a description, or files first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const doctorId =
        localStorage.getItem("doctor_id") || localStorage.getItem("doctorId");
      const response = await createDiagnosis({
        doctorId,
        symptoms: symptoms.join(", "),
        description: caseDescription.trim(),
        files: selectedFiles,
      });

      if (!response || response.success === false) {
        setSubmitError(response?.message || response?.errorMessage || "Diagnosis failed.");
        return;
      }

      setSubmitSuccess(response.message || "Diagnosis submitted successfully.");
      navigate("/ai-diagnosis-result", { state: { diagnosis: response } });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errorMessage ||
        err?.message ||
        "Diagnosis failed.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-4xl px-4 lg:px-6 py-10">
        <div className="bg-white border border-primary-blue/20 rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
              {t("diagnosis.module.title")}
            </h1>
            <p className="text-sm text-neutral-500">
              {t("diagnosis.module.subtitle")}
            </p>
          </div>

          <section className="rounded-2xl border border-primary-blue/20 bg-[#f8fbff] p-5 space-y-4">
            <div className="flex flex-col items-center text-center gap-2 rounded-2xl border-2 border-dashed border-primary-blue/30 bg-white px-6 py-7">
              <div className="h-14 w-14 rounded-full border border-primary-blue/30 bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                <FiUploadCloud size={22} />
              </div>
              <p className="text-sm font-semibold text-neutral-800">
                {t("diagnosis.module.upload.title")}
              </p>
              <p className="text-xs text-neutral-500 max-w-xs">
                {t("diagnosis.module.upload.subtitle")}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-blue/40 bg-white px-4 py-2 text-xs font-semibold text-primary-blue shadow-sm hover:bg-primary-blue/5 transition"
                >
                  <FiImage size={14} />
                  {t("diagnosis.module.upload.image")}
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-blue/40 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-primary-blue/5 transition"
                >
                  <FiFileText size={14} />
                  {t("diagnosis.module.upload.file")}
                </button>
              </div>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesSelected}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,.zip"
                multiple
                onChange={handleFilesSelected}
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row gap-2 text-[11px] text-neutral-400 w-full pt-1">
                <span>{t("diagnosis.module.upload.formats")}</span>
                <span className="sm:ml-auto">{t("diagnosis.module.upload.max")}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-primary-blue/20 bg-[#f8fbff] p-5 space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neutral-800">
                {t("diagnosis.module.manual.title")}
              </h2>
              <p className="text-xs text-neutral-500">
                {t("diagnosis.module.manual.subtitle")}
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <FiPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-blue pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setIsSymptomsModalOpen(true)}
                  className={`w-full rounded-xl border border-primary-blue/30 bg-white px-9 py-3 text-left text-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 outline-none transition ${
                    symptoms.length
                      ? "text-neutral-700"
                      : "text-neutral-400"
                  }`}
                >
                  {symptoms.length
                    ? symptoms.join(", ")
                    : t("diagnosis.module.manual.symptoms")}
                </button>
              </div>
              <div className="relative">
                <FiEdit3 className="absolute left-3 top-3 text-primary-blue pointer-events-none" />
                <button
                  type="button"
                  onClick={openCaseModal}
                  className={`w-full min-h-[140px] max-h-[160px] overflow-hidden rounded-xl border border-primary-blue/30 bg-white px-9 py-3 text-left text-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 outline-none transition ${
                    caseDescription ? "text-neutral-700" : "text-neutral-400"
                  }`}
                >
                  <span className="block whitespace-pre-wrap">
                    {caseDescription || t("diagnosis.module.manual.case")}
                  </span>
                </button>
              </div>
            </div>

            <PrimButton
              className="w-full py-3 text-sm shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition"
              onClick={handleAnalyze}
              disabled={isSubmitting}
            >
              {t("diagnosis.module.manual.analyze")}
            </PrimButton>
            {submitError ? (
              <p className="text-xs text-rose-500">{submitError}</p>
            ) : null}
            {submitSuccess ? (
              <p className="text-xs text-emerald-600">{submitSuccess}</p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-primary-blue/20 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-800">
                {t("diagnosis.module.uploading.title")}
              </p>
              <p className="text-xs font-semibold text-rose-500">
                {t("diagnosis.module.uploading.failed")}
              </p>
            </div>

            <div className="space-y-2">
              {uploads.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-primary-blue/15 bg-[#f8fbff] px-3 py-2"
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center border bg-white ${
                      item.status === "failed"
                        ? "border-rose-200 text-rose-500"
                        : "border-primary-blue/20 text-primary-blue"
                    }`}
                  >
                    {item.status === "failed" ? (
                      <FiAlertCircle size={16} />
                    ) : (
                      <FiFileText size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">{item.size}</p>
                  </div>
                  <UploadStatus status={item.status} t={t} />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {isSymptomsModalOpen && (
        <div
          className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setIsSymptomsModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-primary-blue/20 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-primary-blue/10 space-y-1">
              <h3 className="text-lg font-semibold text-neutral-900">
                {t("diagnosis.module.symptomsModal.title")}
              </h3>
              <p className="text-sm text-neutral-500">
                {t("diagnosis.module.symptomsModal.subtitle")}
              </p>
            </div>

            <div className="px-6 py-5 space-y-5">
              <input
                type="text"
                value={customSymptom}
                onChange={(event) => {
                  setCustomSymptom(event.target.value);
                  if (event.target.value.trim()) {
                    setSelectedSymptom("");
                  }
                }}
                placeholder={t("diagnosis.module.symptomsModal.placeholder")}
                className="w-full rounded-xl border border-primary-blue/30 bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 outline-none"
              />

              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-900">
                  {t("diagnosis.module.symptomsModal.common")}
                </p>
                <div className="space-y-2">
                  {commonSymptoms.map((symptom) => (
                    <label
                      key={symptom}
                      className="flex items-center gap-3 text-sm text-neutral-700"
                    >
                      <input
                        type="radio"
                        name="commonSymptom"
                        value={symptom}
                        checked={selectedSymptom === symptom}
                        onChange={() => {
                          setSelectedSymptom(symptom);
                          setCustomSymptom("");
                        }}
                        className="h-4 w-4 accent-primary-blue"
                      />
                      {symptom}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-primary-blue/10 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSymptomsModalOpen(false)}
                className="rounded-xl border border-primary-blue/40 px-5 py-2 text-sm font-semibold text-primary-blue hover:bg-primary-blue/5 transition"
              >
                {t("diagnosis.module.symptomsModal.cancel")}
              </button>
              <PrimButton
                className="px-5 py-2 text-sm shadow-sm hover:shadow-md"
                onClick={handleAddSymptom}
                disabled={!customSymptom.trim() && !selectedSymptom}
              >
                {t("diagnosis.module.symptomsModal.add")}
              </PrimButton>
            </div>
          </div>
        </div>
      )}

      {isCaseModalOpen && (
        <div
          className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setIsCaseModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl border border-primary-blue/20 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-primary-blue/10 space-y-1">
              <h3 className="text-lg font-semibold text-neutral-900">
                {t("diagnosis.module.caseModal.title")}
              </h3>
              <p className="text-sm text-neutral-500">
                {t("diagnosis.module.caseModal.subtitle")}
              </p>
            </div>

            <div className="px-6 py-5">
              <div className="relative">
                <textarea
                  rows="6"
                  maxLength={maxCaseLength}
                  value={caseDraft}
                  onChange={(event) => setCaseDraft(event.target.value)}
                  placeholder={t("diagnosis.module.caseModal.placeholder")}
                  className="w-full rounded-xl border border-primary-blue/40 bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 outline-none resize-none pb-8"
                />
                <span className="absolute bottom-3 right-4 text-xs text-neutral-400">
                  {caseDraft.length} {t("diagnosis.module.caseModal.of")}{" "}
                  {maxCaseLength}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-primary-blue/10 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCaseModalOpen(false)}
                className="rounded-xl border border-primary-blue/40 px-5 py-2 text-sm font-semibold text-primary-blue hover:bg-primary-blue/5 transition"
              >
                {t("diagnosis.module.caseModal.cancel")}
              </button>
              <PrimButton
                className="px-6 py-2 text-sm shadow-sm hover:shadow-md"
                onClick={handleCaseSave}
              >
                {t("diagnosis.module.caseModal.save")}
              </PrimButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

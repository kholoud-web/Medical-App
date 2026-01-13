import React, { useEffect, useRef, useState } from "react";
import {
  FiFileText,
  FiImage,
  FiMessageSquare,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";

const DIAGNOSIS_BASE_URL = import.meta.env.DEV
  ? ""
  : "https://medicalbotdt-production-b268.up.railway.app";
const DIAGNOSIS_MODULE_ENDPOINT = "/DiagnosisModule/create-daignosis";

export default function DiagnosisModule() {
  const { t } = useLocale();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [createDiagnosisData, setCreateDiagnosisData] = useState(null);
  const [createDiagnosisError, setCreateDiagnosisError] = useState("");
  const [isCreateDiagnosisLoading, setIsCreateDiagnosisLoading] =
    useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [diagnosisStatus, setDiagnosisStatus] = useState("idle");
  const [diagnosisNodeId, setDiagnosisNodeId] = useState(0);
  const [diagnosisQuestion, setDiagnosisQuestion] = useState("");
  const [diagnosisResults, setDiagnosisResults] = useState([]);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [diagnosisError, setDiagnosisError] = useState("");
  const [isDiagnosisLoading, setIsDiagnosisLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpenBot = () => {
    setIsBotOpen(true);
    if (diagnosisStatus === "idle" && !isDiagnosisLoading) {
      handleStartDiagnosis();
    }
  };

  const handleCloseBot = () => {
    setIsBotOpen(false);
  };

  useEffect(() => {
    const firstImage = selectedFiles.find((file) =>
      file.type?.startsWith("image/")
    );

    if (!firstImage) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(firstImage);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFiles]);

  const formatConfidence = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
    if (value > 1) return `${Math.round(value)}%`;
    return `${Math.round(value * 100)}%`;
  };

  const getConfidenceValue = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return 0;
    if (value > 1) return Math.max(0, Math.min(100, Math.round(value)));
    return Math.max(0, Math.min(100, Math.round(value * 100)));
  };

  const formatFileSize = (bytes) => {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setSelectedFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const resetDiagnosis = () => {
    setDiagnosisStatus("idle");
    setDiagnosisNodeId(0);
    setDiagnosisQuestion("");
    setDiagnosisResults([]);
    setDiagnosisHistory([]);
    setDiagnosisError("");
    setIsDiagnosisLoading(false);
  };

  const requestDiagnosis = async (nodeId, answer) => {
    const payload = { node_id: nodeId };
    if (typeof answer === "number") {
      payload.answer = answer;
    }

    const response = await fetch(`${DIAGNOSIS_BASE_URL}/diagnose/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to reach diagnosis service.");
    }

    return response.json();
  };

  const applyDiagnosisResponse = (data) => {
    if (data?.status === "question") {
      setDiagnosisStatus("question");
      setDiagnosisQuestion(data?.question || "");
      setDiagnosisNodeId(
        Number.isInteger(data?.node_id) ? data.node_id : 0
      );
      return;
    }

    if (data?.status === "final") {
      setDiagnosisStatus("final");
      setDiagnosisQuestion("");
      setDiagnosisResults(Array.isArray(data?.results) ? data.results : []);
      setDiagnosisNodeId(0);
      return;
    }

    setDiagnosisStatus("idle");
    setDiagnosisError("Unexpected response from diagnosis service.");
  };

  const handleStartDiagnosis = async () => {
    setDiagnosisError("");
    setDiagnosisQuestion("");
    setDiagnosisResults([]);
    setDiagnosisHistory([]);
    setDiagnosisNodeId(0);
    setIsDiagnosisLoading(true);

    try {
      const data = await requestDiagnosis(0);
      applyDiagnosisResponse(data);
    } catch (error) {
      setDiagnosisStatus("idle");
      setDiagnosisError(error?.message || "Something went wrong.");
    } finally {
      setIsDiagnosisLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    if (diagnosisStatus !== "question" || isDiagnosisLoading) return;
    setDiagnosisError("");
    setIsDiagnosisLoading(true);
    setDiagnosisHistory((prev) => [
      ...prev,
      { question: diagnosisQuestion, answer },
    ]);

    try {
      const data = await requestDiagnosis(diagnosisNodeId, answer);
      applyDiagnosisResponse(data);
    } catch (error) {
      setDiagnosisStatus("question");
      setDiagnosisError(error?.message || "Something went wrong.");
    } finally {
      setIsDiagnosisLoading(false);
    }
  };

  const handleCreateDiagnosis = async () => {
    setCreateDiagnosisError("");
    setCreateDiagnosisData(null);

    if (!selectedFiles.length) {
      setCreateDiagnosisError("Please select a file to analyze.");
      return;
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("authToken");

    if (!token) {
      setCreateDiagnosisError("Missing auth token.");
      return;
    }

    const payload = new FormData();
    selectedFiles.forEach((file) => {
      payload.append("files", file);
    });

    setIsCreateDiagnosisLoading(true);

    try {
      const response = await fetch(DIAGNOSIS_MODULE_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      let data = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (!response.ok || (data && data.success === false)) {
        throw new Error(data?.message || "Diagnosis request failed.");
      }

      setCreateDiagnosisData(data);
    } catch (error) {
      setCreateDiagnosisError(error?.message || "Something went wrong.");
    } finally {
      setIsCreateDiagnosisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-4xl px-4 lg:px-6 py-10">
        <div className="bg-white border border-primary-blue/20 rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 lg:p-8 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
                {t("diagnosis.module.title")}
              </h1>
              <p className="text-sm text-neutral-500">
                {t("diagnosis.module.subtitle")}
              </p>
            </div>
            <PrimButton
              className="self-start px-4 py-2 text-xs sm:text-sm shadow-sm hover:shadow-md"
              onClick={handleOpenBot}
            >
              Medical AI Bot
            </PrimButton>
          </div>

          <section className="rounded-2xl border border-primary-blue/20 bg-white p-5 space-y-4">
            <div className="flex flex-col items-center text-center gap-3 rounded-2xl border border-primary-blue/20 bg-[#f8fbff] px-6 py-7">
              <div className="h-14 w-14 rounded-full border border-primary-blue/30 bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                <FiUploadCloud size={22} />
              </div>
              <p className="text-sm font-semibold text-neutral-800">
                {t("diagnosis.module.upload.title")}
              </p>
              <p className="text-xs text-neutral-500 max-w-xs">
                {t("diagnosis.module.upload.subtitle")}
              </p>

              <div className="w-full max-w-sm pt-2">
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="w-full rounded-xl border-2 border-dashed border-primary-blue/40 bg-white px-4 py-4 text-xs font-semibold text-neutral-600 hover:bg-primary-blue/5 transition flex items-center justify-center gap-2"
                >
                  <FiImage size={16} />
                  {t("diagnosis.module.upload.image")}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 text-[11px] text-neutral-400 w-full pt-1">
                <span>{t("diagnosis.module.upload.formats")}</span>
                <span className="sm:ml-auto">
                  {t("diagnosis.module.upload.max")}
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,application/pdf,.dcm"
                onChange={handleFileSelection}
                className="hidden"
              />

              {selectedFiles.length > 0 && (
                <div className="w-full space-y-2 pt-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-primary-blue/15 bg-[#f8fbff] px-3 py-2 text-left"
                    >
                      <div>
                        <p className="text-xs font-semibold text-neutral-800">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(index)}
                        className="text-[11px] font-semibold text-rose-500 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="w-full pt-4 flex flex-col items-center gap-3">
                <PrimButton
                  className="w-full max-w-sm py-2 text-xs shadow-sm hover:shadow-md"
                  onClick={handleCreateDiagnosis}
                  disabled={isCreateDiagnosisLoading}
                >
                  {isCreateDiagnosisLoading
                    ? "Analyzing..."
                    : t("diagnosis.module.manual.analyze")}
                </PrimButton>
                {createDiagnosisError && (
                  <div className="w-full max-w-sm rounded-xl border border-rose-200 bg-white px-4 py-3 text-xs text-rose-600">
                    {createDiagnosisError}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-primary-blue/20 bg-white p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
              <FiFileText size={16} className="text-primary-blue" />
              <span>Analysis Result</span>
            </div>
            <div className="rounded-2xl border border-primary-blue/20 bg-[#f8fbff] p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="h-48 w-full lg:w-64 rounded-xl border border-primary-blue/20 bg-white flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Selected scan"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-neutral-400">
                      No image selected
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  {createDiagnosisData ? (
                    <>
                      <span className="inline-flex items-center rounded-md bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                        Prediction:{" "}
                        {createDiagnosisData.diagnosisName || "Unknown"}
                        {typeof createDiagnosisData.confidenceLevel ===
                          "number" && (
                          <span>
                            {" "}
                            ({formatConfidence(
                              createDiagnosisData.confidenceLevel
                            )})
                          </span>
                        )}
                      </span>
                      {createDiagnosisData.diagnosisDescription && (
                        <p className="text-sm text-neutral-600">
                          {createDiagnosisData.diagnosisDescription}
                        </p>
                      )}
                      {createDiagnosisData.DiagnosisId && (
                        <p className="text-xs text-neutral-500">
                          Diagnosis ID: {createDiagnosisData.DiagnosisId}
                        </p>
                      )}
                      {Array.isArray(createDiagnosisData.followUpQuestions) &&
                        createDiagnosisData.followUpQuestions.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-neutral-700">
                              Follow-up questions
                            </p>
                            {createDiagnosisData.followUpQuestions.map(
                              (item, index) => (
                                <div
                                  key={`${item.question}-${index}`}
                                  className="rounded-lg border border-primary-blue/10 bg-white px-3 py-2 text-xs text-neutral-600"
                                >
                                  {item.question}
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </>
                  ) : (
                    <p className="text-sm text-neutral-500">
                      Upload an image and analyze to see results.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {isBotOpen && (
        <div className="fixed bottom-6 right-6 z-[12000] w-[260px] sm:w-[320px]">
          <div className="overflow-hidden rounded-2xl border border-primary-blue/20 bg-white shadow-xl">
            <div className="flex items-center justify-between bg-primary-blue px-3 py-2 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <FiMessageSquare size={12} />
                </span>
                Medical AI Bot
              </div>
              <button
                type="button"
                onClick={handleCloseBot}
                className="text-white/80 transition hover:text-white"
                aria-label="Close Medical AI Bot"
              >
                <FiX size={14} />
              </button>
            </div>
            <div className="space-y-3 px-3 py-3">
              {diagnosisError && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] text-rose-600">
                  {diagnosisError}
                </div>
              )}

              {diagnosisStatus !== "final" && (
                <>
                  <p className="text-[11px] text-neutral-400">
                    {diagnosisStatus === "question"
                      ? `Question ${diagnosisHistory.length + 1}`
                      : "Ready"}
                  </p>
                  <div className="rounded-lg border border-primary-blue/20 bg-[#f8fbff] px-3 py-2 text-xs text-neutral-700">
                    {diagnosisQuestion || "Click start to begin."}
                  </div>
                </>
              )}

              {diagnosisStatus === "final" && (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">
                      Diagnosis Results
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Based on your symptoms, here are the most likely
                      conditions:
                    </p>
                  </div>

                  {diagnosisResults.length ? (
                    <div className="space-y-2">
                      {diagnosisResults.map((result, index) => {
                        const confidenceValue = getConfidenceValue(
                          result.confidence
                        );
                        return (
                          <div
                            key={`${result.disease || "result"}-${index}`}
                            className="rounded-lg border border-primary-blue/10 bg-[#f8fbff] px-3 py-2"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold">
                              <span className="text-primary-blue">
                                {result.disease || "Unknown condition"}
                              </span>
                              <span className="text-neutral-600">
                                {formatConfidence(result.confidence)}
                              </span>
                            </div>
                            <div className="mt-2 h-1.5 rounded-full bg-primary-blue/15">
                              <div
                                className="h-1.5 rounded-full bg-primary-blue"
                                style={{ width: `${confidenceValue}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-500">
                      No results returned from the service.
                    </p>
                  )}

                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
                    <span className="font-semibold">Important:</span> This is an
                    informational tool only and not a final diagnosis. Please
                    consult with a healthcare professional for proper medical
                    advice.
                  </div>

                  <button
                    type="button"
                    onClick={handleStartDiagnosis}
                    className="w-full rounded-lg bg-primary-blue px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-blue/90"
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
                  >
                    Send to doctor
                  </button>
                </div>
              )}

              {diagnosisStatus === "idle" && (
                <button
                  type="button"
                  onClick={handleStartDiagnosis}
                  disabled={isDiagnosisLoading}
                  className="w-full rounded-lg bg-primary-blue px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-blue/90 disabled:opacity-60"
                >
                  {isDiagnosisLoading ? "Starting..." : "Start"}
                </button>
              )}

              {diagnosisStatus === "question" && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleAnswer(1)}
                    disabled={isDiagnosisLoading}
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAnswer(0)}
                    disabled={isDiagnosisLoading}
                    className="inline-flex items-center gap-1 rounded-md bg-rose-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-60"
                  >
                    No
                  </button>
                </div>
              )}

              {isDiagnosisLoading && diagnosisStatus !== "idle" && (
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-primary-blue">
                  <span className="h-3 w-3 rounded-full border-2 border-primary-blue/40 border-t-primary-blue animate-spin" />
                  Processing...
                </div>
              )}

              {diagnosisStatus !== "idle" && (
                <button
                  type="button"
                  onClick={resetDiagnosis}
                  className="w-full text-[11px] font-semibold text-primary-blue transition hover:text-primary-blue/80"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

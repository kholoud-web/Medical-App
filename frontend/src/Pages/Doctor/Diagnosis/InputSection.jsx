import React, { useState } from "react";

export default function InputSection() {
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    if (symptoms.trim() === "") {
      setError("Patient Symptoms field is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAnalyzeClick = () => {
    if (validateInput()) {
      alert("Analyzing diagnosis...");
    }
  };

  const handleSaveClick = () => {
    if (validateInput()) {
      alert("Saving diagnosis...");
    }
  };

  return (
    <div className="bg-treat-bg-Gray p-6 rounded-2xl shadow-md border border-blue-200">

      {/* ---- Title ---- */}
      <h2 className="text-center font-semibold text-lg mb-4">
        Diagnosis Assistant
      </h2>

      <div className="space-y-4">

        {/* ---- Patient Symptoms ---- */}
        <div className="relative">
          <input
            type="text"
            placeholder="Patient Symptoms..."
            value={symptoms}
            onChange={(e) => {
              setSymptoms(e.target.value);
              if (e.target.value.trim() !== "") setError("");
            }}
            className={`w-full p-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />

          {/* النجمة الحمرا حسب الصورة */}
          {!symptoms && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg">
              *
            </span>
          )}
        </div>

        {/* ---- Error Message ---- */}
        {error && (
          <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        {/* ---- Notes ---- */}
        <textarea
          placeholder="Notes / Description"
          rows="2"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 resize-none"
        ></textarea>

        {/* ---- Diagnosis Title ---- */}
        <input
          type="text"
          placeholder="Diagnosis Title"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
        />
      </div>

      {/* ---- Buttons ---- */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleAnalyzeClick}
          className="w-[48%] py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
        >
          Analyze with AI
        </button>

        <button
          onClick={handleSaveClick}
          className="w-[48%] py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
        >
          Save diagnosis
        </button>
      </div>
    </div>
  );
}

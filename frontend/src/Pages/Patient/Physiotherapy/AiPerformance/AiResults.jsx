import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AiResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">

        <h2 className="text-lg font-semibold">AI Results</h2>

        <p className="text-sm">
          Exercise_name:{" "}
          <span className="text-primary-blue font-medium">
            {state.exercise}
          </span>
        </p>

        <p className="text-sm">
          Errors:{" "}
          <span className="text-red-500 font-medium">
            {state.errors}
          </span>
        </p>

        <p className="text-sm">
          Feedback:{" "}
          <span className="text-primary-blue font-medium">
            {state.feedback}
          </span>
        </p>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-primary-blue text-white py-2 rounded-lg mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}

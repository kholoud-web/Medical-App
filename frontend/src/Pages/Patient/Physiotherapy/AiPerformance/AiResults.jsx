import { useLocation } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function AIResults() {
  const { state } = useLocation();

  if (!state) return null;

  
  const errorPercent = (state.error * 10).toFixed(1); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-6 border border-gray-100">
        <div className="flex items-center justify-center space-x-3">
          {state.success ? (
            <AiOutlineCheckCircle className="text-green-500 text-4xl animate-bounce" />
          ) : (
            <AiOutlineCloseCircle className="text-red-500 text-4xl animate-shake" />
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {state.exercise}
          </h2>
        </div>

        <p className="text-lg md:text-xl font-semibold text-gray-700">
          {state.feedback}
        </p>

        <div className="mt-2">
          <p className="text-gray-500 font-medium">
            Error Rate:
          </p>
          <div className="relative h-6 w-full bg-gray-200 rounded-full mt-1">
            <div
              className={`absolute top-0 left-0 h-6 rounded-full ${
                state.success ? "bg-green-400" : "bg-red-400"
              }`}
              style={{ width: `${errorPercent}%` }}
            ></div>
            <span className="absolute w-full text-center text-sm font-semibold text-gray-700 top-0">
              {state.error}
            </span>
          </div>
        </div>

        <span
          className={`inline-block px-5 py-2 rounded-full text-sm font-medium shadow ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.success ? "Success" : "Failed"}
        </span>
      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";

export default function AIResults() {
  const { state } = useLocation();
  const navigate = useNavigate(); 

  if (!state) return null;

  const handleDone = () => {
    navigate("/physiotherapy"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-lg border border-gray-100 text-left">
        
        <h2 className="text-2xl font-bold text-[#4a4a4a] mb-8">AI Results</h2>

        <div className="space-y-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-[#4a4a4a]">Exercise_name:</span>
            <span className="text-lg font-semibold text-[#4e92ff]">
              {state.exercise}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-[#4a4a4a]">Errors:</span>
            <span className="text-lg font-semibold text-[#4e92ff]">
              {state.error}
            </span>
          </div>

          <div className="flex items-baseline space-x-2 pb-10">
            <span className="text-lg font-bold text-[#4a4a4a]">Feedback:</span>
            <span className="text-lg font-semibold text-[#4e92ff]">
              {state.feedback}
            </span>
          </div>
        </div>

        <button
          onClick={handleDone}
          className="w-full bg-[#4e92ff] hover:bg-[#3b7ddd] text-white font-bold py-4 rounded-xl transition-colors duration-200 text-lg shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  );
}
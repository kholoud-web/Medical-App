const ConsultationPanel = ({ data, onAccept, onModify, onReject }) => {
  if (!data) {
    return (
      <div className="w-[360px] bg-white border border-blue-400 rounded-xl shadow-md p-6 mt-24">
        <p className="font-semibold text-gray-800 mb-2">
          Select a consultation from the list to review details
        </p>
        <p className="text-gray-500 text-sm">
          or open one of the new requests.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[360px] bg-white border border-blue-400 rounded-xl shadow-md p-6 mt-24 space-y-4">

      {/* Header */}
      <div>
        <h3 className="font-bold text-gray-800">{data.name}</h3>
        <p className="text-sm text-gray-500">
          {data.age} • {data.date}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Model: RespNet v1.2 • Inputs: symptoms + CXR
        </p>
      </div>

      {/* Chief Complaint */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">
          Chief Complaint
        </p>
        <p className="text-sm text-gray-600">
          {data.symptoms}
        </p>
      </div>

      {/* Response */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">
          Response
        </p>
        <div className="border rounded-lg px-3 py-2 text-sm text-gray-700">
          {data.response}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={onAccept}
          className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
        >
          ✓
        </button>

        <button
          onClick={onModify}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        >
          ✎
        </button>

        <button
          onClick={onReject}
          className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ConsultationPanel;

const statusColors = {
  Accepted: "bg-green-100 text-green-600",
  Rejected: "bg-red-100 text-red-600",
  New: "bg-blue-100 text-blue-600",
};

const typeColors = {
  AI: "text-purple-600",
  Inquiry: "text-blue-600",
};

const ConsultationCard = ({ data, onView }) => {
  return (
    <div className="overflow-auto max-h-64 border border-blue-400 rounded-xl p-4 bg-gray-100 hover:shadow transition">
      <div className=" grid grid-cols-6 gap-4 items-center">

        {/* Patient */}
        <div className="col-span-1">
          <h4 className="font-semibold text-gray-800">{data.name}</h4>
          <p className="text-xs text-gray-500">
            {data.age} • {data.gender}
          </p>
        </div>

        {/* Type */}
        <div className="col-span-1 text-sm font-medium">
          <span className={typeColors[data.type]}>
            {data.type}
          </span>
        </div>

        {/* Symptoms */}
        <div className="col-span-1 text-sm text-gray-600">
          {data.symptoms}
        </div>

        {/* Response */}
        <div className="col-span-1 text-xs text-gray-500">
          {data.response}
        </div>

        {/* Status */}
        <div className="col-span-1 flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[data.status]}`}>
         {data.status}
        </span>
        <p className="text-[10px] text-gray-400">{data.date}</p>
        </div>

        {/* Actions */}
        <div className="col-span-1 flex justify-end gap-2">
          <button
            onClick={onView}
            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
          >
            👁
          </button>
          <button className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200">
            ✕
          </button>
        </div>

      </div>
    </div>
  );
};


export default ConsultationCard;

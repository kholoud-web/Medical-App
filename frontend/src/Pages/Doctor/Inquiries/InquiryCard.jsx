import IconYes from "./Icons/yes.svg";
import IconProgress from "./Icons/progress.svg";
import { useDispatch } from "react-redux";
import { openInquiryModal } from "@/RiduxToolkit/Slices/InquirySlice";




export default function InquiryCard({ inquiry}) {
  const dispatch = useDispatch();
  const isReplied = inquiry.status === "Replied";

  return (
    <div className="bg-gray-50 border rounded-xl p-4 space-y-3">

      <div className="flex justify-end">
        <span
          className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${
            isReplied
              ? "bg-blue-100 text-blue-600"
              : "bg-amber-200 text-amber-700"
          }`}
        >
          {isReplied ? (
            <img src={IconYes} className="w-3.5 h-3.5" />
          ) : (
            <img src={IconProgress} className="w-3.5 h-3.5" />
          )}
          <span>{inquiry.status}</span>
        </span>
      </div>

      <h3 className="font-semibold text-gray-800 text-sm">
        {inquiry.title}
      </h3>

   
      <div className="text-xs text-gray-500 space-y-1">
        <p># {inquiry.code}</p>
        <p>{inquiry.date}</p>
      </div>

   
      <button
        onClick={() => dispatch(openInquiryModal(inquiry))}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded-lg transition"
      >
        View details
      </button>
    </div>
  );
}

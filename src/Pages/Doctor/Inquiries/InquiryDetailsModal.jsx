import IconYes from "./Icons/yes.svg";
import IconProgress from "./Icons/progress.svg";
import IconDownload from "./Icons/download.svg";
import { useDispatch , useSelector } from "react-redux";
import { closeInquiryModal } from "@/RiduxToolkit/Slices/InquirySlice";



export default function InquiryDetailsModal() {
   const dispatch = useDispatch();
     const { selectedInquiry: inquiry, isModalOpen } = useSelector(
    (state) => state.inquiry
  );
  
  if (!isModalOpen || !inquiry) return null;

  const isReplied = inquiry.status === "Replied";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
     
      <div
        className={`bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative
          ${isReplied ? "max-h-[80vh] overflow-auto" : ""}`}
      >
   
        <button
          onClick={()=>dispatch(closeInquiryModal())}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              {inquiry.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span># {inquiry.code}</span>
              <span>{inquiry.date}</span>
            </div>
          </div>

          <span
            className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${
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

        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
          <div className="border rounded-lg p-3 text-sm text-blue-600 bg-blue-50">
            {inquiry.description}
            <div className="text-right text-[11px] text-gray-500 mt-2">
              {inquiry.time}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
          <div className="border-2 border-dashed rounded-lg p-4 text-sm text-gray-500 text-center">
            {inquiry.attachments.join(", ")}
          </div>
        </div>

     
        {isReplied && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Doctor reply</p>
            <div className="border rounded-lg p-3 text-sm text-blue-600 bg-blue-50">
              {inquiry.reply}
              <div className="text-right text-[11px] text-gray-500 mt-2">
                {inquiry.replyTime}
              </div>
            </div>
          </div>
        )}

        {isReplied && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Doctor plan or prescription
            </p>

            <div className="border-2 border-dashed rounded-lg p-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <img src={IconDownload} className="w-4 h-4" />
              {inquiry.plan}
            </div>
          </div>
        )}

        <button
          onClick={()=>dispatch(closeInquiryModal)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

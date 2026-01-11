import { useEffect } from "react";
import IconYes from "./Icons/yes.svg";
import IconProgress from "./Icons/progress.svg";
import IconDownload from "./Icons/download.svg";
import { useDispatch, useSelector } from "react-redux";
import { closeInquiryModal, fetchInquiryById } from "@/RiduxToolkit/Slices/InquirySlice";

export default function InquiryDetailsModal() {
  const dispatch = useDispatch();
  const { selectedInquiry, currentInquiry, isModalOpen, fetchingInquiry } = useSelector(
    (state) => state.inquiry
  );

  // Fetch full inquiry details when modal opens
  useEffect(() => {
    if (isModalOpen && selectedInquiry?.inquiryId) {
      dispatch(fetchInquiryById(selectedInquiry.inquiryId));
    }
  }, [isModalOpen, selectedInquiry?.inquiryId, dispatch]);

  if (!isModalOpen || !selectedInquiry) return null;

  // Use currentInquiry for full details, fallback to selectedInquiry
  const inquiry = currentInquiry || selectedInquiry;
  const isReplied = inquiry.status === "Completed" || inquiry.status === "Replied";

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format time only
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative
          ${isReplied ? "max-h-[80vh] overflow-auto" : ""}`}
      >
        {/* Close button */}
        <button
          onClick={() => dispatch(closeInquiryModal())}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        {/* Loading state */}
        {fetchingInquiry ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading inquiry details...</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  {inquiry.symptoms || "No symptoms provided"}
                </h2>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <span># {inquiry.inquiryId}</span>
                  <span>{formatDate(inquiry.date)}</span>
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
                  <img src={IconYes} className="w-3.5 h-3.5" alt="Completed" />
                ) : (
                  <img src={IconProgress} className="w-3.5 h-3.5" alt="Pending" />
                )}
                <span>{inquiry.status}</span>
              </span>
            </div>

            {/* Patient Notes */}
            {inquiry.notes && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Patient Notes</p>
                <div className="border rounded-lg p-3 text-sm text-gray-700 bg-gray-50">
                  {inquiry.notes}
                  <div className="text-right text-[11px] text-gray-500 mt-2">
                    {formatTime(inquiry.date)}
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
              <div className="border-2 border-dashed rounded-lg p-4 text-sm text-gray-500">
                {inquiry.files && inquiry.files.length > 0 ? (
                  <div className="space-y-2">
                    {inquiry.files.map((fileUrl, index) => (
                      <a
                        key={index}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <img src={IconDownload} className="w-4 h-4" alt="Download" />
                        File {index + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">No attachments</div>
                )}
              </div>
            </div>

            {/* Doctor Reply (if completed) */}
            {isReplied && inquiry.description && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Doctor's Diagnosis</p>
                <div className="border rounded-lg p-3 text-sm text-blue-600 bg-blue-50">
                  {inquiry.description}
                  <div className="text-right text-[11px] text-gray-500 mt-2">
                    {formatTime(inquiry.date)}
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Info (if rejected) */}
            {inquiry.rejectReason && (
              <div className="mb-4">
                <p className="text-sm font-medium text-red-700 mb-2">Rejection Reason</p>
                <div className="border border-red-200 rounded-lg p-3 text-sm text-red-600 bg-red-50">
                  <p className="font-medium">{inquiry.rejectReason}</p>
                  {inquiry.rejectNotes && (
                    <p className="mt-2 text-xs">{inquiry.rejectNotes}</p>
                  )}
                </div>
              </div>
            )}

            {/* Doctor Info */}
            {inquiry.doctorId && (
              <div className="mb-6 text-xs text-gray-500">
                Doctor ID: {inquiry.doctorId}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => dispatch(closeInquiryModal())}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Ok
            </button>
          </>
        )}
      </div>
    </div>
  );
}





















// import IconYes from "./Icons/yes.svg";
// import IconProgress from "./Icons/progress.svg";
// import IconDownload from "./Icons/download.svg";
// import { useDispatch , useSelector } from "react-redux";
// import { closeInquiryModal } from "@/RiduxToolkit/Slices/InquirySlice";
// import { useEffect } from "react";
// import { closeInquiryModal , fetchInquiryById } from "@/RiduxToolkit/Slices/InquirySlice";



// export default function InquiryDetailsModal() {
//    const dispatch = useDispatch();
//      const { selectedInquiry: inquiry, isModalOpen } = useSelector(
//     (state) => state.inquiry
//   );


//   // Fetch full inquiry details when modal opens
//   useEffect(() => {
//     if (isModalOpen && selectedInquiry?.inquiryId) {
//       dispatch(fetchInquiryById(selectedInquiry.inquiryId));
//     }
//   }, [isModalOpen, selectedInquiry?.inquiryId, dispatch]);

//   if (!isModalOpen || !selectedInquiry) return null;

//   // Use currentInquiry for full details, fallback to selectedInquiry
//   const inquiry = currentInquiry || selectedInquiry;
//   const isReplied = inquiry.status === "Completed" || inquiry.status === "Replied";

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Format time only
//   const formatTime = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
     
//       <div
//         className={`bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative
//           ${isReplied ? "max-h-[80vh] overflow-auto" : ""}`}
//       >
   
//         <button
//           onClick={()=>dispatch(closeInquiryModal())}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
//         >
//           ×
//         </button>
       
//         {/* Loading state */}
//         {fetchingInquiry ? (
//           <div className="flex items-center justify-center py-8">
//             <div className="text-gray-500">Loading inquiry details...</div>
//           </div>
//         ) : (
//           <>
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h2 className="font-semibold text-gray-800 text-lg">
//                {inquiry.symptoms || "No symptoms provided"}
//             </h2>
//             <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
//               <span># {inquiry.inquiryId}</span>
//               <span>{inquiry.date}</span>
//             </div>
//           </div>

//           <span
//             className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${
//               isReplied
//                 ? "bg-blue-100 text-blue-600"
//                 : "bg-amber-200 text-amber-700"
//             }`}
//           >
//             {isReplied ? (
//               <img src={IconYes} className="w-3.5 h-3.5" />
//             ) : (
//               <img src={IconProgress} className="w-3.5 h-3.5" />
//             )}
//             <span>{inquiry.status}</span>
//           </span>
//         </div>

        
//         <div className="mb-4">
//           <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
//           <div className="border rounded-lg p-3 text-sm text-blue-600 bg-blue-50">
//             {inquiry.description}
//             <div className="text-right text-[11px] text-gray-500 mt-2">
//               {inquiry.time}
//             </div>
//           </div>
//         </div>

//         <div className="mb-4">
//           <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
//           <div className="border-2 border-dashed rounded-lg p-4 text-sm text-gray-500 text-center">
//             {inquiry.attachments.join(", ")}
//           </div>
//         </div>

     
//         {isReplied && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Doctor reply</p>
//             <div className="border rounded-lg p-3 text-sm text-blue-600 bg-blue-50">
//               {inquiry.reply}
//               <div className="text-right text-[11px] text-gray-500 mt-2">
//                 {inquiry.replyTime}
//               </div>
//             </div>
//           </div>
//         )}

//         {isReplied && (
//           <div className="mb-6">
//             <p className="text-sm font-medium text-gray-700 mb-2">
//               Doctor plan or prescription
//             </p>

//             <div className="border-2 border-dashed rounded-lg p-4 text-sm text-gray-500 flex items-center justify-center gap-2">
//               <img src={IconDownload} className="w-4 h-4" />
//               {inquiry.plan}
//             </div>
//           </div>
//         )}

//         <button
//           onClick={()=>dispatch(closeInquiryModal)}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
//         >
//           Ok
//         </button>
//       </div>
//     </div>
//   );
// }

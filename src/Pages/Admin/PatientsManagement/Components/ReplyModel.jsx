// Components/ReplyModal.jsx
import React from "react";

const ReplyModal = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-gray-100">
        
        {/* Subject Section */}
        <div className="mb-6">
          <label className="block text-[#505050] font-bold mb-2">Subject</label>
          <input 
          type="text"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-[#747474]"
          defaultValue={request.subject}
          >
          </input>
        </div>

        {/* Details Section */}
        <div className="mb-6">
          <label className="block text-[#505050] font-bold mb-2">Details</label>
          <textarea 
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-[#747474] min-h-[120px] outline-none resize-none"
            defaultValue={request.details || "I tried to upload my wrist X-ray during the diagnosis process, but the upload keeps failing. I have a stable internet connection and tried more than once. Could you please help me fix this issue?"}
          />
        </div>

        {/* Reply Section */}
        <div className="mb-6">
          <label className="block text-[#505050] font-bold mb-2">Reply</label>
          <textarea
            placeholder="Enter your Reply"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 min-h-[120px] resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
            onClick={() => { onClose(); }}
          >
            Send Reply
          </button>
          <button 
            className="px-8 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
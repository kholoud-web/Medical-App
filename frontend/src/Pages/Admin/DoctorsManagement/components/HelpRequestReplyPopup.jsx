import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function HelpRequestReplyPopup({ isOpen, onClose, onSave, request }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSave?.({ request, message });
      setMessage("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setMessage("");
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div className="max-w-2xl w-full rounded-xl bg-white p-8 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Subject</label>
            <input
              type="text"
              readOnly
              value={request?.subject || ""}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 bg-neutral-50 text-neutral-700 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Details</label>
            <textarea
              readOnly
              rows={5}
              value={request?.details || ""}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 bg-neutral-50 text-neutral-700 outline-none resize-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Reply</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your Reply"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-700 outline-primary-blue resize-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="rounded-lg bg-primary-blue px-8 py-2.5 text-white shadow hover:bg-primary-blue/90 font-medium disabled:opacity-50">
              {loading ? "Sending..." : "Send Reply"}
            </button>
            <button type="button" onClick={handleClose} disabled={loading} className="rounded-lg border border-neutral-300 px-8 py-2.5 text-neutral-700 hover:bg-neutral-50 font-medium disabled:opacity-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function HelpRequestReplyPopup({ isOpen, onClose, onSave, request }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSave?.({ request, message });
    setMessage("");
    onClose?.();
  };

  const handleClose = () => {
    setMessage("");
    onClose?.();
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
            <button type="submit" className="rounded-lg bg-primary-blue px-8 py-2.5 text-white shadow hover:bg-primary-blue/90 font-medium">Send Reply</button>
            <button type="button" onClick={handleClose} className="rounded-lg border border-neutral-300 px-8 py-2.5 text-neutral-700 hover:bg-neutral-50 font-medium">Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

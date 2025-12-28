import React from "react";
import { createPortal } from "react-dom";

export default function DeactivateConfirmPopup({ isOpen, onClose, onConfirm, doctor }) {
  if (!isOpen) return null;

  const handleOverlayClick = () => onClose?.();
  const stop = (e) => e.stopPropagation();

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
      <div className="max-w-md w-full rounded-xl bg-white p-6 shadow-xl" onClick={stop}>
        <h3 className="text-xl font-semibold text-neutral-800">Deactivate doctor{doctor?.name ? ` — ${doctor.name}` : ""}</h3>
        <p className="mt-2 text-sm text-neutral-600">This will prevent the doctor from logging in and receiving consultations until reactivated.</p>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-10 py-2.5 text-white shadow hover:bg-red-700"
          >
            Deactivate
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-300 px-10 py-2.5 text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

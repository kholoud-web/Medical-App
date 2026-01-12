import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ResetPasswordPopup({ isOpen, onClose, onSave, doctor }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => setForm({ current: "", next: "", confirm: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.next.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    if (form.next !== form.confirm) {
      alert("New passwords do not match.");
      return;
    }
    onSave?.({ doctor, current: form.current, next: form.next });
    resetState();
    onClose?.();
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="max-w-xl w-full rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-xl font-semibold text-neutral-800">Reset password{doctor?.name ? ` — ${doctor.name}` : ""}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Current password</label>
            <input
              type="password"
              name="current"
              value={form.current}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-neutral-600">New password</label>
            <input
              type="password"
              name="next"
              value={form.next}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Confirm new password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" className="rounded-lg bg-primary-blue px-10 py-2.5 text-white shadow hover:bg-primary-blue/90">Save</button>
            <button type="button" onClick={handleClose} className="rounded-lg border border-neutral-300 px-10 py-2.5 text-neutral-700 hover:bg-neutral-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

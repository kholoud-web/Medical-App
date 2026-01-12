import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, clearSuccess, clearError } from '@/RiduxToolkit/Slices/SystemSettingSlice';

export default function AddAdminOverlay({ open, onClose }) {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.systemSetting);
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(addAdmin(formData))
      .unwrap()
      .then(() => {
        // Clear form and close modal on success
        setFormData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: ""
        });
        setTimeout(() => {
          dispatch(clearSuccess());
          onClose();
        }, 2000);
      })
      .catch((err) => {
        console.error('Add admin failed:', err);
      });
  };

  const handleClose = () => {
    dispatch(clearError());
    dispatch(clearSuccess());
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: ""
    });
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div 
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-semibold text-neutral-800">Add Admin</h2>
        
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-green-700 border border-green-200">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-600">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary-blue px-10 py-2.5 text-white shadow hover:bg-primary-blue/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border border-neutral-300 px-10 py-2.5 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function AddDoctorPopup({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    phoneNumber: "",
    nationalId: "",
    dateOfBirth: "",
    address: "",
    gender: "Male",
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
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      experience: "",
      phoneNumber: "",
      nationalId: "",
      dateOfBirth: "",
      address: "",
      gender: "Male",
    });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div 
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-semibold text-neutral-800">Add doctor</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            <label className="mb-1 block text-sm text-neutral-600">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 10 y"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Phone number</label>
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
            <label className="mb-1 block text-sm text-neutral-600">National ID</label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Date of birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-primary-blue"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-primary-blue">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary-blue accent-primary-blue cursor-pointer"
                />
                <span className="text-neutral-700">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary-blue accent-primary-blue cursor-pointer"
                />
                <span className="text-neutral-700">Female</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-primary-blue px-12 py-2.5 text-white shadow hover:bg-primary-blue/90"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-neutral-300 px-12 py-2.5 text-neutral-700 hover:bg-neutral-50"
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

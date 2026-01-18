import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function AddDoctorPopup({ isOpen, onClose, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    FName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experienceYears: "",
    phoneNumber: "",
    nationalId: "",
    birthDate: "",
    address: "",
    gender: "Male",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.userName || !formData.FName || !formData.lName || !formData.email || !formData.phoneNumber || !formData.address) {
        alert("Please fill all fields in Info step");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.password || !formData.confirmPassword) {
        alert("Please fill password fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.experienceYears || !formData.nationalId || !formData.birthDate) {
      alert("Please fill all fields in Details step");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Call onSave and wait for it to complete
      await Promise.resolve(onSave(formData));
      
      // Only show success if we get here without error
      setSuccess(true);
      
      // Close the popup after a short delay to let the success message appear
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      const errorMsg = err?.message || "Failed to add doctor";
      setError(errorMsg);
      
      // Parse validation errors and map them to field names
      if (errorMsg.includes(':')) {
        const errors = {};
        errorMsg.split('\n').forEach(line => {
          const [field, message] = line.split(':');
          if (field && message) {
            errors[field.trim().toLowerCase()] = message.trim();
          }
        });
        setFieldErrors(errors);
      }
      
      // Close popup after 3 seconds to let user see the error in the alert
      setTimeout(() => {
        handleClose();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      userName: "",
      FName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
      experienceYears: "",
      phoneNumber: "",
      nationalId: "",
      birthDate: "",
      address: "",
      gender: "Male",
    });
    setSuccess(false);
    setError(null);
    setFieldErrors({});
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  // Success screen
  if (success) {
    return createPortal(
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
        onClick={handleClose}
      >
        <div 
          className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-6xl mb-4 text-green-500">✓</div>
            <h2 className="text-2xl font-bold text-neutral-800 text-center mb-4">Doctor Added Successfully!</h2>
            <p className="text-neutral-600 text-center mb-2 text-lg">
              Email confirmation link has been sent to:
            </p>
            <p className="text-primary-blue font-semibold text-lg mb-6">
              {formData.email}
            </p>
            <p className="text-neutral-600 text-center text-sm mb-6 max-w-md">
              Please ask the doctor to check their email and click the confirmation link to activate their account.
            </p>
            <button
              onClick={handleClose}
              className="rounded-lg bg-primary-blue px-8 py-2.5 text-white shadow hover:bg-primary-blue/90"
            >
              Done
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div 
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-8 text-2xl font-semibold text-neutral-800 text-center">Add doctor</h2>
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 font-semibold mb-2">Validation Error:</p>
            <div className="text-red-600 text-sm whitespace-pre-wrap">
              {error.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white font-bold ${
                    currentStep === step
                      ? 'bg-primary-blue'
                      : 'bg-neutral-400'
                  }`}
                >
                  {step}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  currentStep === step ? 'text-neutral-800' : 'text-neutral-500'
                }`}>
                  {step === 1 ? 'Info' : step === 2 ? 'Account' : 'Details'}
                </span>
              </div>
              {index < 2 && (
                <div className="mb-8 h-1 w-12 border-b-2 border-dashed border-neutral-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <hr className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Info */}
          {currentStep === 1 && (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">First Name</label>
                  <input
                    type="text"
                    name="FName"
                    value={formData.FName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">Last Name</label>
                  <input
                    type="text"
                    name="lName"
                    value={formData.lName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>
            </>
          )}

          {/* Step 2: Account */}
          {currentStep === 2 && (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>
            </>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Years of experience</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-primary-blue"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-700">Gender</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
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
                  <label className="flex items-center gap-3 cursor-pointer">
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
            </>
          )}

          {/* Buttons */}
          <div className="mt-8 flex gap-4 pt-4">
            {currentStep > 1 && currentStep < 3 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="flex-1 rounded-lg border-2 border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-50"
              >
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="flex-1 rounded-lg bg-primary-blue px-6 py-3 font-semibold text-white hover:bg-primary-blue/90 transition disabled:opacity-50"
              >
                Next
              </button>
            )}
            {currentStep === 1 && currentStep < 3 && (
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 rounded-lg border-2 border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            {currentStep === 3 && (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-primary-blue px-6 py-3 font-semibold text-white hover:bg-primary-blue/90 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 rounded-lg border-2 border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-50"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

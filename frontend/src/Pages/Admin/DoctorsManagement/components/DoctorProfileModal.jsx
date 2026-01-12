import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfile } from "../../../../RiduxToolkit/Slices/DoctorManagementSlice";

export default function DoctorProfileModal({ isOpen, onClose, doctorId }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.doctorManagement);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isOpen && doctorId) {
      dispatch(getDoctorProfile(doctorId))
        .unwrap()
        .then((data) => setProfile(data))
        .catch((err) => console.error("Failed to fetch profile:", err));
    }
  }, [isOpen, doctorId, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-900">Doctor Profile</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-primary-blue"></div>
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">Full Name</h3>
                  <p className="mt-1 text-neutral-900">{profile.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">Email</h3>
                  <p className="mt-1 text-neutral-900">{profile.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">Phone Number</h3>
                  <p className="mt-1 text-neutral-900">{profile.phoneNumber || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">Gender</h3>
                  <p className="mt-1 text-neutral-900">{profile.gender || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">National ID</h3>
                  <p className="mt-1 text-neutral-900">{profile.nationalId || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-600">Date of Birth</h3>
                  <p className="mt-1 text-neutral-900">
                    {profile.dateOfBirth && profile.dateOfBirth !== "0001-01-01T00:00:00"
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Professional Info */}
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-900 mb-4">Professional Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600">Specialization</h3>
                    <p className="mt-1 text-neutral-900">{profile.specialization || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600">Address</h3>
                    <p className="mt-1 text-neutral-900">{profile.address || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600">Status</h3>
                    <p className="mt-1">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        profile.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {profile.isActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-900 mb-4">Statistics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-600">Consultations</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">{profile.totalConsultations || 0}</p>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-600">Total Patients</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">{profile.totalPatients || 0}</p>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-600">Active Patients</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">{profile.activePatients || 0}</p>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-600">Consults Count</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">{profile.consultationsCount || 0}</p>
                  </div>
                </div>
              </div>

              {/* Consultation History */}
              {profile.consultationHistory && profile.consultationHistory.length > 0 && (
                <div className="border-t border-neutral-200 pt-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Recent Consultations</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {profile.consultationHistory.map((consultation, idx) => (
                      <div key={idx} className="rounded-lg bg-neutral-50 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {consultation.consultationType}
                            </p>
                            <p className="text-xs text-neutral-600 mt-1">
                              {new Date(consultation.consultationDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                            #{consultation.consultationId}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              Failed to load doctor profile
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 hover:bg-neutral-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

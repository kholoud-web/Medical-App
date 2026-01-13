import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DoctorIcon from "./Icons/docor.svg";
import HelpIcon from "./Icons/help.svg";
import DoctorsTable from "./components/DoctorsTable";
import HelpRequestsTable from "./components/HelpRequestsTable";
import AddDoctorPopup from "./components/AddDoctorPopup";
import ResetPasswordPopup from "./components/ResetPasswordPopup";
import DeactivateConfirmPopup from "./components/DeactivateConfirmPopup";
import HelpRequestReplyPopup from "./components/HelpRequestReplyPopup";
import DoctorProfileModal from "./components/DoctorProfileModal";
import { 
  fetchDoctors, 
  createDoctor,
  deactivateDoctor,
  resetDoctorPassword,
  clearError, 
  clearSuccess 
} from "../../../RiduxToolkit/Slices/DoctorManagementSlice";
import { fetchAdmins, sendReply, fetchContentById } from "../../../RiduxToolkit/Slices/HelpSupportSlice";

export default function DoctorsManagement() {
  const dispatch = useDispatch();
  const { doctors, loading, error, successMessage } = useSelector((state) => state.doctorManagement);
  const { inquiries, loading: helpLoading, error: helpError } = useSelector((state) => state.help);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetDoctor, setResetDoctor] = useState(null);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [deactivateDoctorData, setDeactivateDoctorData] = useState(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const [helpQuery, setHelpQuery] = useState("");
  const [helpStatus, setHelpStatus] = useState("all");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // Fetch doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAdmins());
  }, [dispatch]);

  // Auto-dismiss messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchQuery = d.name?.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === "all" ? true : d.status?.toLowerCase() === status.toLowerCase();
      return matchQuery && matchStatus;
    });
  }, [doctors, query, status]);

  const helpRequests = useMemo(() => {
    if (!Array.isArray(inquiries)) return [];
    return inquiries.map((inquiry, index) => ({
      id: inquiry.id || (index + 1),
      doctor: {
        name: inquiry.userName || "Unknown",
        experience: inquiry.experience || "N/A",
        gender: inquiry.gender || "N/A",
        avatar: inquiry.avatar || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop",
      },
      subject: inquiry.subject || "No Subject",
      details: inquiry.details || "",
      status: inquiry.status || "New",
    }));
  }, [inquiries]);

  const helpFiltered = useMemo(() => {
    return helpRequests.filter((r) => {
      const matchQuery = r.subject.toLowerCase().includes(helpQuery.toLowerCase()) || r.doctor.name.toLowerCase().includes(helpQuery.toLowerCase());
      const matchStatus = helpStatus === "all" ? true : r.status.toLowerCase() === helpStatus.toLowerCase();
      return matchQuery && matchStatus;
    });
  }, [helpRequests, helpQuery, helpStatus]);

  const handleAddDoctor = (formData) => {
    const doctorData = {
      userName: formData.userName,
      FName: formData.FName,
      lName: formData.lName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      nationalId: formData.nationalId,
      birthDate: formData.birthDate,
      address: formData.address,
      experienceYears: parseInt(formData.experienceYears) || 0,
      clientUri: `${window.location.origin}/confirm-email`,
    };
    
    return dispatch(createDoctor(doctorData))
      .unwrap()
      .then(() => {
        // Refresh doctors list after adding
        dispatch(fetchDoctors());
      })
      .catch((err) => {
        console.error('Create doctor failed:', err);
        const details =
          typeof err === 'string'
            ? err
            : err?.message || JSON.stringify(err);
        Swal.fire("Error", `Create doctor failed: ${details}`, "error");
        throw err; // Re-throw so the child component knows it failed
      });
  };

  const openResetPassword = (doctor) => {
    setResetDoctor(doctor);
    setIsResetOpen(true);
  };

  const closeResetPassword = () => {
    setIsResetOpen(false);
    setResetDoctor(null);
  };

  const handleSaveResetPassword = ({ doctor, next }) => {
    if (doctor?.id) {
      dispatch(resetDoctorPassword({ doctorId: doctor.id, newPassword: next }))
        .unwrap()
        .then(() => {
          alert(`Password reset successfully for ${doctor.name}!`);
          closeResetPassword();
        })
        .catch((err) => {
          console.error('Reset password failed:', err);
          alert(`Reset password failed: ${err}`);
        });
    }
  };

  const openDeactivate = (doctor) => {
    setDeactivateDoctorData(doctor);
    setIsDeactivateOpen(true);
  };

  const closeDeactivate = () => {
    setIsDeactivateOpen(false);
    setDeactivateDoctorData(null);
  };

  const handleConfirmDeactivate = () => {
    if (deactivateDoctorData) {
      dispatch(deactivateDoctor(deactivateDoctorData.id))
        .unwrap()
        .then(() => {
          dispatch(fetchDoctors());
          closeDeactivate();
        })
        .catch((err) => {
          console.error('Deactivate failed:', err);
          alert(`Deactivate failed: ${err}`);
        });
    }
  };

  const openReply = (request) => {
    setSelectedRequest(request);
    setIsReplyOpen(true);
  };

  const closeReply = () => {
    setIsReplyOpen(false);
    setSelectedRequest(null);
  };

  const handleSaveReply = ({ request, message }) => {
    if (!request?.id) {
      Swal.fire("Error", "No request ID found", "error");
      return Promise.reject("No request ID");
    }
    
    if (!message) {
      Swal.fire("Error", "No message provided", "error");
      return Promise.reject("No message");
    }
    
    return dispatch(sendReply({ ticketId: request.id, reply: message }))
      .unwrap()
      .then((result) => {
        // Show success notification
        Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          text: "Your reply has been sent successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        
        // Refresh data
        dispatch(fetchContentById(request.id))
          .catch((err) => console.error("fetchContentById error:", err));
        
        dispatch(fetchAdmins())
          .catch((err) => {
            Swal.fire("Warning", "Reply sent but couldn't refresh list. Please refresh the page.", "warning");
          });
        
        // Close modal after a short delay
        setTimeout(() => {
          closeReply();
        }, 500);
        
        return result;
      })
      .catch((err) => {
        Swal.fire("Error", `Failed to send reply: ${err}`, "error");
        throw err;
      });
  };

  const openProfile = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setSelectedDoctorId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())} className="text-red-500 hover:text-red-700 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex justify-between items-center">
          <span>{successMessage}</span>
          <button onClick={() => dispatch(clearSuccess())} className="text-green-500 hover:text-green-700 font-bold">
            ✕
          </button>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Doctors Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage doctor accounts and monitor activity</p>
        </div>
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="bg-primary-blue text-white rounded-lg px-4 py-2 shadow hover:bg-primary-blue/90"
        >
          + Add doctor
        </button>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <button 
          onClick={() => setActiveTab("doctors")}
          className={`flex items-center gap-2 font-medium ${activeTab === "doctors" ? "text-primary-blue" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          <img 
            src={DoctorIcon} 
            alt="doctors table" 
            className={`h-4 w-4 transition-all ${activeTab === "doctors" ? "brightness-0 saturate-100" : "opacity-60"}`}
            style={activeTab === "doctors" ? { filter: "invert(37%) sepia(98%) saturate(2969%) hue-rotate(195deg) brightness(95%) contrast(101%)" } : {}}
          />
          Doctors Table
        </button>
        <button 
          onClick={() => setActiveTab("help")}
          className={`flex items-center gap-2 font-medium ${activeTab === "help" ? "text-primary-blue" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          <img 
            src={HelpIcon} 
            alt="help requests" 
            className={`h-4 w-4 transition-all ${activeTab === "help" ? "brightness-0 saturate-100" : "opacity-60"}`}
            style={activeTab === "help" ? { filter: "invert(37%) sepia(98%) saturate(2969%) hue-rotate(195deg) brightness(95%) contrast(101%)" } : {}}
          />
          Help requests <span className="ml-1 rounded-full bg-neutral-200 px-2 text-xs">{helpRequests.length}</span>
        </button>
      </div>

      {activeTab === "doctors" && (
        <DoctorsTable 
          doctors={doctors}
          filtered={filtered}
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
          onResetPassword={openResetPassword}
          onDeactivate={openDeactivate}
          onViewProfile={openProfile}
          loading={loading}
        />
      )}

      {activeTab === "help" && (
        <HelpRequestsTable 
          helpFiltered={helpFiltered}
          helpQuery={helpQuery}
          setHelpQuery={setHelpQuery}
          helpStatus={helpStatus}
          setHelpStatus={setHelpStatus}
          helpRequests={helpRequests}
          onReply={openReply}
        />
      )}

      <AddDoctorPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleAddDoctor}
      />

      <ResetPasswordPopup
        isOpen={isResetOpen}
        onClose={closeResetPassword}
        onSave={handleSaveResetPassword}
        doctor={resetDoctor}
      />

      <DeactivateConfirmPopup
        isOpen={isDeactivateOpen}
        onClose={closeDeactivate}
        onConfirm={handleConfirmDeactivate}
        doctor={deactivateDoctorData}
      />

      <HelpRequestReplyPopup
        isOpen={isReplyOpen}
        onClose={closeReply}
        onSave={handleSaveReply}
        request={selectedRequest}
      />

      <DoctorProfileModal
        isOpen={isProfileOpen}
        onClose={closeProfile}
        doctorId={selectedDoctorId}
      />
    </div>
  );
}

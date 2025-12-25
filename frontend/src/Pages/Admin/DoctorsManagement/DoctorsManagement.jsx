import React, { useMemo, useState } from "react";
import DoctorIcon from "./Icons/docor.svg";
import HelpIcon from "./Icons/help.svg";
import DoctorsTable from "./components/DoctorsTable";
import HelpRequestsTable from "./components/HelpRequestsTable";
import AddDoctorPopup from "./components/AddDoctorPopup";
import ResetPasswordPopup from "./components/ResetPasswordPopup";
import DeactivateConfirmPopup from "./components/DeactivateConfirmPopup";
import HelpRequestReplyPopup from "./components/HelpRequestReplyPopup";

export default function DoctorsManagement() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetDoctor, setResetDoctor] = useState(null);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [deactivateDoctor, setDeactivateDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const [helpQuery, setHelpQuery] = useState("");
  const [helpStatus, setHelpStatus] = useState("all");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const doctors = useMemo(() => (
    [
      {
        name: "Sara Ali",
        experience: "10 y",
        gender: "Female",
        consultations: 10,
        lastConsultation: "Dec 12, 2025",
        status: "Active",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
      },
      {
        name: "Amr Mohamed",
        experience: "10 y",
        gender: "Male",
        consultations: 9,
        lastConsultation: "Dec 10, 2025",
        status: "Inactive",
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop"
      },
      {
        name: "Salma Omar",
        experience: "10 y",
        gender: "Female",
        consultations: 8,
        lastConsultation: "Dec 15, 2025",
        status: "Active",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
      },
      {
        name: "Ramy Ahmed",
        experience: "10 y",
        gender: "Male",
        consultations: 5,
        lastConsultation: "Dec 17, 2025",
        status: "Active",
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop"
      },
      {
        name: "Hana Tarek",
        experience: "10 y",
        gender: "Female",
        consultations: 15,
        lastConsultation: "Dec 3, 2025",
        status: "Active",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
      },
      {
        name: "Mohamed Ali",
        experience: "10 y",
        gender: "Male",
        consultations: 12,
        lastConsultation: "Dec 2, 2025",
        status: "Inactive",
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop"
      },
    ]
  ), []);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchQuery = d.name.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === "all" ? true : d.status.toLowerCase() === status.toLowerCase();
      return matchQuery && matchStatus;
    });
  }, [doctors, query, status]);

  const helpRequests = useMemo(() => (
    [
      { doctor: { name: "Mario Maged", experience: "12 y", gender: "Male", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" }, subject: "Unable to upload patient X-ray image", details: "I'm unable to upload a wrist X-ray while completing a diagnosis. The upload fails despite multiple attempts and a stable connection. Please assist.", status: "New" },
      { doctor: { name: "John William", experience: "12 y", gender: "Male", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" }, subject: "Prescription Renewal Request", details: "", status: "New" },
      { doctor: { name: "Ahmed Ali", experience: "10 y", gender: "Male", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" }, subject: "Prescription Renewal Request", details: "", status: "Replied" },
      { doctor: { name: "Amir Magdy", experience: "5 y", gender: "Male", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" }, subject: "Prescription Renewal Request", details: "", status: "Replied" },
      { doctor: { name: "Shady Monir", experience: "20 y", gender: "Male", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" }, subject: "Prescription Renewal Request", details: "I need help understanding the latest updates to the prescription renewal system.", status: "New" },
    ]
  ), []);

  const helpFiltered = useMemo(() => {
    return helpRequests.filter((r) => {
      const matchQuery = r.subject.toLowerCase().includes(helpQuery.toLowerCase()) || r.doctor.name.toLowerCase().includes(helpQuery.toLowerCase());
      const matchStatus = helpStatus === "all" ? true : r.status.toLowerCase() === helpStatus.toLowerCase();
      return matchQuery && matchStatus;
    });
  }, [helpRequests, helpQuery, helpStatus]);

  const handleAddDoctor = (newDoctor) => {
    console.log("New doctor added:", newDoctor);
  };

  const openResetPassword = (doctor) => {
    setResetDoctor(doctor);
    setIsResetOpen(true);
  };

  const closeResetPassword = () => {
    setIsResetOpen(false);
    setResetDoctor(null);
  };

  const handleSaveResetPassword = () => {
    closeResetPassword();
  };

  const openDeactivate = (doctor) => {
    setDeactivateDoctor(doctor);
    setIsDeactivateOpen(true);
  };

  const closeDeactivate = () => {
    setIsDeactivateOpen(false);
    setDeactivateDoctor(null);
  };

  const handleConfirmDeactivate = () => {
    console.log("Deactivate doctor:", deactivateDoctor);
    closeDeactivate();
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
    console.log("Reply saved:", { request, message });
    closeReply();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
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
        doctor={deactivateDoctor}
      />

      <HelpRequestReplyPopup
        isOpen={isReplyOpen}
        onClose={closeReply}
        onSave={handleSaveReply}
        request={selectedRequest}
      />
    </div>
  );
}

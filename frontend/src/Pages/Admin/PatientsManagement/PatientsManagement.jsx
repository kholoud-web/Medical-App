import React, { useEffect, useState } from "react";
import TabButton from "./Components/TabButton";
import PatientRow from "./Components/PatientRow";
import HelpRequestRow from "./Components/HelpRequestRow";
import ReplyModal from "./Components/replyModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, fetchHelpRequests, removePatient } from "../../../RiduxToolkit/Slices/patientsSlice";

const PatientsManagement = () => {
  const [activeTab, setActiveTab] = useState("Help Requests");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Status");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const dispatch = useDispatch();
  const { 
    patients, 
    helpRequests, 
    loadingPatients, 
    loadingHelpRequests 
  } = useSelector((state) => state.patients);

  // جلب البيانات عند تغيير التاب أو البحث
  useEffect(() => {
    if (activeTab === "Patient Table") {
      dispatch(fetchPatients({ search, pageNumber: 1, pageSize: 10 }));
    } else if (activeTab === "Help Requests") {
      dispatch(fetchHelpRequests({ search, pageNumber: 1, pageSize: 10 }));
    }
  }, [activeTab, search, dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setFilter("All Status");
    setSelectedRequest(null);
  };

  // فلترة البيانات حسب البحث والحالة
  const filteredPatients = (patients || []).filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All Status" || patient.status === filter.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  const filteredRequests = (helpRequests || []).filter((request) => {
    const matchesSearch = request.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All Status" || request.status === filter.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#505050]">
          Patients Management
        </h1>
        <p className="text-[#747474] text-sm">
          View patient accounts and diagnosis history
        </p>
      </section>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <TabButton
          active={activeTab === "Patient Table"}
          icon="fa-users"
          label="Patient Table"
          onClick={() => handleTabChange("Patient Table")}
        />
        <TabButton
          active={activeTab === "Help Requests"}
          icon="fa-headset"
          label="Help Requests"
          badge={filteredRequests.length}
          onClick={() => handleTabChange("Help Requests")}
        />
      </div>

      {/* Search & Filter */}
      <section className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#747474]"></i>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative flex-1 w-full lg:w-48">
          <i className="fa-solid fa-filter absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

          {activeTab === "Patient Table" && (
            <select
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Deleted</option>
            </select>
          )}

          {activeTab === "Help Requests" && (
            <select
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>New</option>
              <option>Replied</option>
            </select>
          )}
        </div>
      </section>

      {/* Patient Table */}
      {activeTab === "Patient Table" && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {[
                    "Patient Name",
                    "Age",
                    "Gender",
                    "Diagnoses",
                    "Last Diagnosis",
                    "Status",
                    "Actions",
                  ].map((head) => (
                    <th key={head} className="px-6 py-4 text-xs font-bold uppercase text-[#505050]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingPatients ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      Loading patients...
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <PatientRow key={patient.id} patient={patient} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Help Requests Table */}
      {activeTab === "Help Requests" && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Patient Name", "Age", "Gender", "Subject", "Status"].map(
                    (head) => (
                      <th key={head} className="px-6 py-4 text-xs font-bold uppercase text-[#505050]">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingHelpRequests ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      Loading help requests...
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <HelpRequestRow
                      key={request.id}
                      request={request}
                      onReply={setSelectedRequest}
                    />
                  ))
                )}
              </tbody>
            </table>

            {/* Reply Modal */}
            {selectedRequest && (
              <ReplyModal
                request={selectedRequest}
                onClose={() => setSelectedRequest(null)}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PatientsManagement;

import React, { useState } from "react";
import TabButton from "./Components/TabButton";
import PatientRow from "./Components/PatientRow";
import { patientsData } from "./Patients";
import HelpRequestRow from "./Components/HelpRequestRow";
import { helpRequests } from "./HelpRequestsData";
import ReplyModal from "./Components/replyModel";

const PatientsManagement = () => {
  const [activeTab, setActiveTab] = useState("Help Requests");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Status");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleTabChange = (tab) => {
  setActiveTab(tab);
  setSearch(""); // إعادة تعيين البحث
  setFilter("All Status"); // إعادة تعيين الفلتر
  setSelectedRequest(null); // إغلاق أي مودال مفتوح
};

  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All Status" || patient.status === filter.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  const filteredRequest = helpRequests.filter((request) => {
    const matchesSearch = request.name
      .toLowerCase()
      .includes(search.toLowerCase());
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
          badge={5}
          onClick={() => handleTabChange("Help Requests")}
        />
      </div>

      <section className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#747474]"></i>
          <input
            type="text"
            placeholder="Search Patients..."
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
            )
            }

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
            )
            }
          
        </div>
      </section>

      {/* Patient Tabel */}
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
                    <th
                      key={head}
                      className="px-6 py-4 text-xs font-bold uppercase text-[#505050]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPatients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* HelpRequest Tabel */}
      {activeTab === "Help Requests" && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Patient Name", "Age", "Gender", "Subject", "Status"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-xs font-bold uppercase text-[#505050]"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRequest.map((request) => (
                  <HelpRequestRow
                    key={request.id}
                    request={request}
                    onReply={(request) => setSelectedRequest(request)}
                  />
                ))}
              </tbody>
            </table>
            {/* عرض الـ Modal فقط عند اختيار طلب */}
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

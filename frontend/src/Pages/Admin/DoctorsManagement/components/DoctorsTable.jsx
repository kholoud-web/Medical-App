import React, { useState } from "react";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import PulseIcon from "../Icons/pulse.svg";
import CalendarIcon from "../Icons/calender.svg";
import MenuIcon from "../Icons/menu.svg";

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}

function ConsultationCell({ count }) {
  return (
    <div className="flex items-center justify-center gap-2 text-neutral-700">
      <img src={PulseIcon} alt="pulse" className="h-4 w-4" />
      <span>{count}</span>
    </div>
  );
}

function DateCell({ date }) {
  return (
    <div className="flex items-center justify-center gap-2 text-neutral-700">
      <img src={CalendarIcon} alt="calendar" className="h-4 w-4" />
      <span>{date}</span>
    </div>
  );
}

function DoctorRow({ doctor, onResetPassword, onDeactivate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleViewProfile = () => {
    console.log("View profile:", doctor.name);
    setIsMenuOpen(false);
  };

  const handleDeactivate = () => {
    onDeactivate?.(doctor);
    setIsMenuOpen(false);
  };

  const handleResetPassword = () => {
    onResetPassword?.(doctor);
    setIsMenuOpen(false);
  };

  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="font-medium text-neutral-900">{doctor.name}</div>
            <div className="text-xs text-neutral-500">{doctor.specialty}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-center text-neutral-700">{doctor.experience}</td>
      <td className="px-4 py-3 text-center text-neutral-700">{doctor.gender}</td>
      <td className="px-4 py-3 text-center"><ConsultationCell count={doctor.consultations} /></td>
      <td className="px-4 py-3 text-center"><DateCell date={doctor.lastConsultation} /></td>
      <td className="px-4 py-3 text-center"><StatusBadge status={doctor.status} /></td>
      <td className="px-4 py-3 text-center">
        <div className="relative inline-block">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded p-1 hover:bg-neutral-100" 
            aria-label="Actions"
          >
            <img src={MenuIcon} alt="menu" className="h-5 w-5" />
          </button>
          
          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 py-1">
                <button
                  onClick={handleViewProfile}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <FiEye className="h-4 w-4 text-neutral-500" />
                  View Profile
                </button>
                <button
                  onClick={handleDeactivate}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <MdBlock className="h-4 w-4" />
                  Deactivate
                </button>
                <button
                  onClick={handleResetPassword}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <RiLockPasswordLine className="h-4 w-4 text-neutral-500" />
                  Reset password
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function DoctorsTable({ doctors, filtered, query, setQuery, status, setStatus, onResetPassword, onDeactivate }) {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors..."
              className="w-full rounded-lg border border-neutral-200 pl-10 pr-3 py-2 outline-primary-blue"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
        </div>
        <div className="relative w-full">
          <FiFilter
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
            aria-hidden="true"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
          <colgroup>
            <col style={{ width: "24%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>
          <thead className="bg-neutral-50 text-neutral-600">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Doctor Name</th>
              <th className="px-4 py-3 font-medium text-center">Experience</th>
              <th className="px-4 py-3 font-medium text-center">Gender</th>
              <th className="px-4 py-3 font-medium text-center">Consultations</th>
              <th className="px-4 py-3 font-medium text-center">Last consultation</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((d, idx) => (
              <DoctorRow 
                key={idx} 
                doctor={d} 
                onResetPassword={onResetPassword}
                onDeactivate={onDeactivate}
              />
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">Showing {filtered.length} of {doctors.length} doctors</p>
    </>
  );
}

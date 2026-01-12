import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

export default function HelpRequestsTable({ helpFiltered, helpQuery, setHelpQuery, helpStatus, setHelpStatus, helpRequests, onReply }) {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <div className="relative">
            <input
              type="text"
              value={helpQuery}
              onChange={(e) => setHelpQuery(e.target.value)}
              placeholder="Search help request..."
              className="w-full rounded-lg border border-neutral-200 pl-10 pr-3 py-2 outline-primary-blue"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
        </div>
        <div className="relative w-full">
          <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" aria-hidden="true" />
          <select
            value={helpStatus}
            onChange={(e) => setHelpStatus(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="replied">Replied</option>
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
            <col style={{ width: "32%" }} />
            <col style={{ width: "22%" }} />
          </colgroup>
          <thead className="bg-neutral-50 text-neutral-600">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Doctor Name</th>
              <th className="px-4 py-3 font-medium text-center">Experience</th>
              <th className="px-4 py-3 font-medium text-center">Gender</th>
              <th className="px-4 py-3 font-medium text-center">Subject</th>
              <th className="px-4 py-3 font-medium text-center w-40">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {helpFiltered.map((r, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={r.doctor.avatar} alt={r.doctor.name} className="h-8 w-8 rounded-full object-cover" />
                    <div className="leading-tight">
                      <div className="font-medium text-neutral-900">{r.doctor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-neutral-700">{r.doctor.experience}</td>
                <td className="px-4 py-3 text-center text-neutral-700">{r.doctor.gender}</td>
                <td className="px-4 py-3 text-center text-neutral-700">{r.subject}</td>
                <td className="px-4 py-3 text-center w-40">
                  <div className="flex items-center justify-center gap-2">
                    {r.status === "New" ? (
                      <span className="inline-flex min-w-[70px] justify-center items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium">New</span>
                    ) : (
                      <span className="inline-flex min-w-[70px] justify-center items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">Replied</span>
                    )}
                    <button
                      onClick={() => onReply(r)}
                      className="flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <span className="text-xs">↩</span>
                      Reply
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">Showing {helpFiltered.length} of {helpRequests.length} requests</p>
    </>
  );
}

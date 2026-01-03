import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const ConsultationsHeader = ({ search, status, onSearchChange, onStatusChange }) => {
  return (
<div className="bg-white px-6 pt-6 pb-4 ">
      {/* العنوان والنص الوصفي */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Consultations
        </h1>
        <p className="text-gray-500 text-sm">
          Manage incoming requests, review AI suggestions and finalize patient diagnoses
        </p>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* حقل البحث */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search in Consultations ...."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* قائمة الحالات (Dropdown) */}
        <div className="relative min-w-[380px]">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none bg-white border border-blue-400 rounded-lg px-4 py-2 pr-10 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            defaultValue="all"
          >
            <option value="all">All statuses</option>
            <option value="pending">Reject</option>
            <option value="completed">Accept</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsHeader;
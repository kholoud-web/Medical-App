// src/components/MedicalRecordsCard.jsx

import React from 'react';
import { ClipboardList, Stethoscope, AlertTriangle } from 'lucide-react'; // تحتاج إلى تثبيت lucide-react

const TestResultCard = ({ testType, date }) => (
  <div className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-600 transition duration-150">
    <ClipboardList className="w-4 h-4"/>
    <span>{testType}</span>
    <span className="opacity-80">| {date}</span>
  </div>
);

const MedicalRecordsCard = ({ diseases, allergies, tests }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
        Medical Records
      </h3>
      
      <div className="mb-4">
        <p className="font-medium text-sm text-gray-500 mb-1">Previous Diseases: </p>
        <p className="text-gray-700 font-normal">{diseases}</p>
      </div>
      
      <div className="mb-6">
        <p className="font-medium text-sm text-gray-500 mb-1 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
          Allergies: 
        </p>
        <p className="text-gray-700 font-normal">{allergies}</p>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 flex-wrap gap-y-3">
        {tests.map((test, index) => (
          <TestResultCard key={index} testType={test.type} date={test.date} />
        ))}
      </div>
    </div>
  );
};

export default MedicalRecordsCard;
// src/components/PatientInfoCard.jsx

import React from 'react';

const PatientInfoCard = ({ name, gender, phone, patientId, lastVisit, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
          <img 
            src={imageUrl || "path/to/default/avatar.png"} // استبدلها بمسار الصورة الفعلي
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      </div>
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium text-gray-500">Gender :</span>
          <span className="text-gray-700">{gender}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium text-gray-500">Phone Number :</span>
          <span className="text-gray-700">{phone}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium text-gray-500">Patient ID :</span>
          <span className="text-gray-700">{patientId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Last Visit :</span>
          <span className="text-gray-700">{lastVisit}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
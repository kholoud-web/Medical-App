// src/components/CurrentTreatmentPlan.jsx

import React from 'react';
import { Zap, Clock, Calendar } from 'lucide-react'; // تحتاج إلى تثبيت lucide-react

const SessionRow = ({ session, date, duration }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-gray-700 font-medium">{session}</span>
    <span className="text-gray-600 text-sm flex items-center">
      <Calendar className="w-3 h-3 mr-1 text-blue-400" />
      {date}
    </span>
    <span className="text-gray-600 text-sm flex items-center">
      <Clock className="w-3 h-3 mr-1 text-blue-400" />
      {duration}
    </span>
  </div>
);

const CurrentTreatmentPlan = ({ instructions, sessions }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-blue-500" />
        Current Treatment Plan
      </h3>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium text-sm text-gray-500 mb-2">Doctor's Instructions:</p>
        <p className="text-gray-700 text-sm italic leading-relaxed">{instructions}</p>
      </div>

      <h4 className="font-semibold text-gray-600 mb-3">Sessions</h4>
      
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 border-b pb-2 mb-2">
          <span>Sessions</span>
          <span>Date</span>
          <span>Duration</span>
      </div>
      
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <SessionRow 
            key={index}
            session={session.name}
            date={session.date}
            duration={session.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentTreatmentPlan;
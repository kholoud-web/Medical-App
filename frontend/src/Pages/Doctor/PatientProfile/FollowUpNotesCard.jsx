// src/components/FollowUpNotesCard.jsx

import React from 'react';
import { FileText } from 'lucide-react'; // تحتاج إلى تثبيت lucide-react

const NoteItem = ({ doctor, date, note }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <p className="text-sm font-semibold text-gray-700 mb-1">Dr. {doctor} – {date}</p>
    <p className="text-sm text-gray-600 leading-relaxed">{note}</p>
  </div>
);

const FollowUpNotesCard = ({ notes }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-500" />
        Follow-up Notes
      </h3>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2"> 
        {notes.map((note, index) => (
          <NoteItem 
            key={index}
            doctor={note.doctor}
            date={note.date}
            note={note.note}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowUpNotesCard;
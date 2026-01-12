import React from 'react';
import InputSection from './InputSection';
import DiagnosisDetails from './DiagnosisDetails';
import DiagnosisTemplates from './DiagnosisTemplates';

const DiagnosisAssistant = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
       
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Diagnosis Assistant
        </h1>

        <InputSection />
        <DiagnosisDetails />
        <DiagnosisTemplates />
      </div>
    </div>
  );
};

export default DiagnosisAssistant;
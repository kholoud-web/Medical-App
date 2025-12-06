import React from 'react';
import InputSection from './InputSection';
import DiagnosisDetails from './DiagnosisDetails';
import DiagnosisTemplates from './DiagnosisTemplates';

const DiagnosisAssistant = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* شريط العنوان */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Diagnosis Assistant
        </h1>

        {/* 1. قسم الإدخال */}
        <InputSection />

        {/* 2. قسم التفاصيل */}
        <DiagnosisDetails />

        {/* 3. قسم القوالب */}
        <DiagnosisTemplates />
      </div>
    </div>
  );
};

export default DiagnosisAssistant;
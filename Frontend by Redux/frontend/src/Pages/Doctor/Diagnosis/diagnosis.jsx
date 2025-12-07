// src/Pages/Doctor/Diagnosis/DiagnosisPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputText,
  clearAll,
  analyzeWithAI,
  setDiagnosisData,
} from "../../../Redux/Diagnosis/diagnosisSlice";

// البيانات الوهمية للقوالب (Templates)
const diagnosisTemplates = [
  { icon: '🌡️', title: 'Cold & Flu', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: '☕', title: 'Stomach Pain', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: '💖', title: 'Hypertension', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: '📈', title: 'Diabetes Follow-up', color: 'text-blue-500', bg: 'bg-blue-50' },
];

export default function DiagnosisPage() {
  const dispatch = useDispatch();
  const { inputText, diagnosisData, loading, error } = useSelector(
    (s) => s.diagnosis
  );

  // حالة لتخزين نص الملاحظات وعنوان التشخيص
  const [notesText, setNotesText] = useState("");
  const [diagnosisTitle, setDiagnosisTitle] = useState("");
  
  // دمج inputText مع notesText لإرساله إلى AI
  const fullTextToAnalyze = `${inputText.trim()} ${notesText.trim()}`.trim();


  // **تم حذف جميع وظائف التسجيل والتشغيل (STT & TTS) بالكامل**


  const handleAnalyze = () => {
    if (!fullTextToAnalyze) return alert("الرجاء إدخال الأعراض أولاً"); 
    dispatch(analyzeWithAI(fullTextToAnalyze));
  };

  const handleSaveDiagnosis = () => {
      alert("سيتم تنفيذ وظيفة حفظ التشخيص هنا.");
  };

  const handleEditDiagnosis = () => {
      alert("سيتم تنفيذ وظيفة تعديل التشخيص هنا.");
  };
  
  const handleClear = () => {
    dispatch(clearAll());
    setNotesText("");
    setDiagnosisTitle("");
  };


  // مُكوّن لتنسيق العناصر داخل قسم التشخيص
  const DiagnosisItem = ({ title, data, isSymptoms = false }) => (
    <div className="space-y-1">
        <h4 className={`${isSymptoms ? 'text-red-500' : 'text-orange-600'} font-bold mb-2`}>{title}</h4>
        <ul className="list-disc ml-5 space-y-1">
            {data.map((item, i) => (
                <li key={i} className="text-sm text-gray-700">{item}</li>
            ))}
        </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* 1. قسم الإدخال (العلوي) */}
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-blue-500 space-y-4">
          <h1 className="text-2xl font-extrabold text-blue-700 text-center">Diagnosis Assistant</h1>
          
          <div className="space-y-3">
              {/* حقل أعراض المريض */}
              <input
                  type="text"
                  value={inputText}
                  onChange={(e) => dispatch(setInputText(e.target.value))}
                  placeholder="Patient Symptoms... *"
                  className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base placeholder-gray-400"
              />
              {/* حقل الملاحظات */}
              <input
                  type="text"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Notes / Description"
                  className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base placeholder-gray-400"
              />
              {/* حقل عنوان التشخيص */}
              <input
                  type="text"
                  value={diagnosisTitle}
                  onChange={(e) => setDiagnosisTitle(e.target.value)}
                  placeholder="Diagnosis Title (Optional)"
                  className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base placeholder-gray-400"
              />
          </div>
          
          {/* أزرار التحليل والحفظ */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAnalyze}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-[1.01]"
              disabled={loading || !fullTextToAnalyze}
            >
              {loading ? "Analyzing..." : "Analyze with AI"}
            </button>
            <button
              onClick={handleSaveDiagnosis}
              className="flex-1 py-3 bg-white border border-blue-500 text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition transform hover:scale-[1.01]"
              disabled={!diagnosisData}
            >
              Save Diagnosis
            </button>
          </div>
        </div>
        
        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        {/* 2. قسم نتائج التشخيص (Analysis Details) */}
        {diagnosisData && !loading && (
          <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 relative">
            <h2 className="text-xl font-extrabold text-gray-800 border-b pb-4">Diagnosis Details</h2>
            
            {/* عنوان التشخيص العام */}
            <p className="text-xl font-bold text-gray-900">
                {diagnosisData.title || diagnosisTitle || "AI Generated Diagnosis"}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                
                {/* 2.1 الأعراض */}
                <DiagnosisItem title="Symptoms" data={diagnosisData.symptoms} isSymptoms={true} />

                {/* 2.2 الملاحظات السريرية */}
                <DiagnosisItem title="Clinical Findings" data={diagnosisData.clinicalFindings} />

                {/* 2.3 الأدوية المقترحة */}
                <div className="md:col-span-2 space-y-2 pt-4">
                    <h4 className="text-green-600 font-bold mb-2">Suggested Medications</h4>
                    <ul className="list-disc ml-5 space-y-1">
                        {diagnosisData.medications.map((m, i) => (
                            <li key={i} className="text-base text-gray-700">{m}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* زر التعديل (Edit) */}
            <button
                onClick={handleEditDiagnosis}
                className="absolute bottom-6 right-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
            >
                Edit
            </button>
          </div>
        )}

        {/* 3. قسم التشخيص (Templates) */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Diagnosis Templates</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {diagnosisTemplates.map((template, index) => (
              <div 
                key={index} 
                className={`p-6 bg-white rounded-xl shadow-xl border border-gray-100 text-center flex flex-col items-center justify-between transition hover:shadow-2xl hover:border-blue-200 cursor-pointer`}
              >
                <div className={`${template.color} text-4xl mb-3`}>
                    {template.icon}
                </div>
                <h3 className="font-bold text-base mb-4 text-gray-700">{template.title}</h3>
                <button className="w-full py-2 bg-blue-500/10 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition">
                  Use template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
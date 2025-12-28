import ConsultationsHeader from "./components/ConsultationsHeader";
import ConsultationCard from "./components/ConsultationCard";
import ConsultationPanel from "./components/ConsultationPanel";

import { useState } from "react";
import ModifyDiagnosisModal from './components/ModifyDiagnosisModal ';
import RejectDiagnosisModal from './components/RejectDiagnosisModal ';

const data = [
  {
    name: "Aisha Mohamed",
    age: "34.F",
    type: "Inquiry",
    symptoms: "Fever, cough, shortness of breath for 2 days",
    response: "Viral Upper Respiratory Infection, Possible COVID-19",
    status: "New",
    date: "2025/12/5 • AM 10:30",
  },
  {
    name: "Omar Salah",
    age: "48.M",
    type: "AI",
    symptoms: "Abdominal pain and nausea for 12 hours",
    response: "Viral Upper Respiratory Infection, Possible COVID-19",
    status: "Accepted",
    date: "2025/12/5 • AM 7:30",
  },
  {
    name: "Nada Alaa",
    age: "27.F",
    type: "AI",
    symptoms: "Rash on forearm after detergent",
    response: "Viral Upper Respiratory Infection, Possible COVID-19",
    status: "Rejected",
    date: "2025/12/4 • PM 8:30",
  },
  {
    name: "Noha Mohamed",
    age: "31.F",
    type: "AI",
    symptoms: "Rash on forearm after detergent",
    response: "Viral Upper Respiratory Infection, Possible COVID-19",
    status: "Accepted",
    date: "2025/12/4 • PM 8:30",
  },
  {
    name: "Ali Salah",
    age: "31.F",
    type: "AI",
    symptoms: "Abdominal pain and nausea for 12 hours.",
    response: "Viral Upper Respiratory Infection, Possible COVID-19",
    status: "Rejected",
    date: "2025/12/4 • PM 8:30",
  },
];

const Consultations = () => {
  const [selectedConsultation , setSelectedConsultation] = useState(null);
  const [openModify, setOpenModify] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      
      {/* القسم الرئيسي للجدول */}
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 تمنع العناصر من دفع الحاوية للخارج */}
        <ConsultationsHeader />
        
        <div className="flex flex-1 px-4 md:px-6 pb-6 gap-4 md:gap-6">
          <div className="flex-grow space-y-3">
            
            {/* صف العناوين: يظهر فقط في الشاشات الكبيرة لتجنب التداخل الموضح في الصورة */}
            <div className="hidden xl:grid border border-blue-400 rounded-xl grid-cols-6 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
              <div>Patient</div>
              <div>Type</div>
              <div>Symptoms</div>
              <div>Response</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            
            {/* القائمة */}
            <div className="space-y-3">
              {data.map((item, index) => (
                <ConsultationCard
                 key={index} 
                 data={item} 
                 onView={() => setSelectedConsultation(item)}
                 />
              ))}
            </div>
          </div>

          {/* البانل الجانبي: يصغر عرضه في الشاشات المتوسطة ويختفي في الصغيرة */}
          <div className="hidden lg:block lg:w-[280px] xl:w-[360px] flex-shrink-0">
            <ConsultationPanel  
            data={selectedConsultation}
            onModify={() => setOpenModify(true)}
            onReject={() => setOpenReject(true)}
            />
          </div>
           {/* MODALS */}
            {openModify && (
              <ModifyDiagnosisModal
                onClose={() => setOpenModify(false)}
              />
            )}

            {openReject && (
              <RejectDiagnosisModal
                onClose={() => setOpenReject(false)}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultations;

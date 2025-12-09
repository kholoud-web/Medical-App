import React from 'react';
// استيراد الأيقونات من مكتبة react-icons
// import { FaThermometerHalf, FaCoffee, FaHeartbeat, FaChartLine } from 'react-icons/fa';
import ThermoIcon from "./Icons/thermo.svg"
import StomachIcon from "./Icons/stomach.svg"
import HeartIcon from "./Icons/heart.svg"
import DiabetesIcon from "./Icons/diabetes.svg"

const TemplateCard = ({ icon, title, borderColor }) => (
  <div className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white flex flex-col justify-between h-full hover:shadow-2xl transition duration-300">

    <div className="flex items-center mb-6">
      <div className={`relative p-3 rounded-full bg-white border ${borderColor} mr-4`}>
        <img 
          src={icon} 
          alt={title} 
          className="w-8 h-8 object-contain"
        />
      </div>

      <p className="font-semibold text-gray-800 text-sm leading-snug">
        {title}
      </p>
    </div>

    <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 shadow-md">
      Use template
    </button>
  </div>
);

const DiagnosisTemplates = () => {
  const templates = [
  {
    icon: ThermoIcon,
    title: "Cold & Flu",
    borderColor: "border-red-300",
  },
  {
    icon: StomachIcon,
    title: "Stomach Pain",
    borderColor: "border-green-300",
  },
  {
    icon: HeartIcon,
    title: "Hypertension",
    borderColor: "border-pink-300",
  },
  {
    icon: DiabetesIcon,
    title: "Diabetes Follow-up",
    borderColor: "border-blue-300",
  },
];


  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Diagnosis Templates
      </h2>
      
    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> 
        {templates.map((template, index) => (
         <TemplateCard
  key={index}
  icon={template.icon}
  title={template.title}
  borderColor={template.borderColor}
/>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisTemplates;
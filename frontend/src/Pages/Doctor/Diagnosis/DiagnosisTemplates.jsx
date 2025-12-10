import React from 'react';
import ThermoIcon from "./Icons/thermo.svg"
import StomachIcon from "./Icons/stomach.svg"
import HeartIcon from "./Icons/heart.svg"
import DiabetesIcon from "./Icons/diabetes.svg"

const TemplateCard = ({ icon, title, borderColor, background }) => (
  <div className="w-full h-full max-w-[243px] max-h-[209px] p-4 rounded-xl shadow-xl 
  border border-blue-200 bg-treat-bg-Gray 
  flex flex-col  
  hover:shadow-2xl transition duration-300">

    <div className="flex items-center gap-3 mb-4 min-h-[60px]">
      <div className={` rounded-full ${background} border ${borderColor} shadow-md`}>
        <img 
          src={icon} 
          alt={title} 
          className="w-8 h-8 object-contain"
        />
      </div>

      <p className="font-semibold text-gray-800 text-l leading-snug">
        {title}
      </p>
    </div>

    <button className="w-full py-1 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition duration-300 shadow-md">
      Use template
    </button>
  </div>
);

const DiagnosisTemplates = () => {
  const templates = [
    {
      icon: ThermoIcon,
      title: "Cold & Flu",
      borderColor: "border-red-100",
      background: "bg-red-100",
    },
    {
      icon: StomachIcon,
      title: "Stomach Pain",
      borderColor: "border-green-100",
      background: "bg-green-100",
    },
    {
      icon: HeartIcon,
      title: "Hypertension",
      borderColor: "border-pink-100",
      background: "bg-pink-100",
    },
    {
      icon: DiabetesIcon,
      title: "Diabetes Follow-up",
      borderColor: "border-blue-100",
      background: "bg-blue-100",
    },
  ];

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Diagnosis Templates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {templates.map((template, index) => (
          <TemplateCard
            key={index}
            icon={template.icon}
            title={template.title}
            borderColor={template.borderColor}
            background={template.background}
          />
        ))}
      </div>
    </div>
  );
};

export default DiagnosisTemplates;

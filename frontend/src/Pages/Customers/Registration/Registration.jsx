import React from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد أداة التنقل
import bgImage from './Image/LoginImg.jpg'; 

const Register = () => {
  const navigate = useNavigate(); // تعريف دالة التنقل

  const handleConfirm = (e) => {
    e.preventDefault(); // منع تحديث الصفحة عند الضغط على الزر
    
    // يمكنك إضافة منطق التحقق من البيانات هنا (Validation)
    
    // الانتقال إلى صفحة إعادة تعيين كلمة المرور
    navigate('/reset-password'); 
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* طبقة تظليل للخلفية لزيادة تباين النموذج */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* نموذج التسجيل بتأثير الزجاج (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-lg bg-black/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        
        {/* زر اختيار نوع المستخدم */}
        <div className="absolute top-6 left-6">
          <select className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1 text-xs outline-none cursor-pointer hover:bg-white/20 transition">
            <option className="bg-gray-800">Patient</option>
            <option className="bg-gray-800">Doctor</option>
          </select>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-10 tracking-tight">
          Registration
        </h1>

        <form className="space-y-5" onSubmit={handleConfirm}>
          
          {/* الاسم الأول والثاني */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-white text-sm font-medium ml-1">First name</label>
              <input 
                required
                type="text" 
                className="w-full p-3.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-inner text-gray-800" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm font-medium ml-1">Last name</label>
              <input 
                required
                type="text" 
                className="w-full p-3.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-inner text-gray-800" 
              />
            </div>
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium ml-1">Email</label>
            <input 
              required
              type="email" 
              placeholder="Enter your email or phone number.." 
              className="w-full p-3.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-inner placeholder:text-gray-400 text-gray-800" 
            />
          </div>

          {/* كلمة المرور */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium ml-1">Password</label>
            <input 
              required
              type="password" 
              placeholder="create password at least 8ch .." 
              className="w-full p-3.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-inner placeholder:text-gray-400 text-gray-800" 
            />
          </div>

          {/* الجنس */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium ml-1">Gender</label>
            <div className="flex gap-8 mt-2 px-1">
              <label className="flex items-center text-white gap-2 cursor-pointer group">
                <input type="radio" name="gender" className="w-4 h-4 accent-blue-500 cursor-pointer" /> 
                <span className="group-hover:text-blue-300 transition">Male</span>
              </label>
              <label className="flex items-center text-white gap-2 cursor-pointer group">
                <input type="radio" name="gender" className="w-4 h-4 accent-blue-500 cursor-pointer" /> 
                <span className="group-hover:text-blue-300 transition">Female</span>
              </label>
            </div>
          </div>

          {/* زر التأكيد */}
          <button 
            type="submit"
            className="w-full bg-[#1b75ff] hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-6"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
import React from 'react';

import bgImage from './Image/LoginImg.jpg'; 
import { IoIosArrowBack } from "react-icons/io"; 

const ResetPassword = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      <div className="absolute inset-0 bg-black/30"></div>

      
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-10 shadow-2xl">
        
        <button 
          onClick={() => window.history.back()}
          className="absolute top-8 left-8 text-white hover:text-blue-400 transition-colors"
        >
          <IoIosArrowBack size={24} />
        </button>

      
        <h2 className="text-4xl font-bold text-white text-center mb-10 mt-2">
          Reset Password
        </h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
        
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium ml-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email or phone number.."
              className="w-full px-4 py-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner placeholder:text-gray-400 text-gray-800"
            />
          </div>

         
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium ml-1">New password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner text-gray-800"
            />
          </div>

        
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium ml-1">Confirm password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner text-gray-800"
            />
          </div>

         
          <button 
            type="submit" 
            className="w-full py-3.5 mt-4 bg-[#4a83ff] hover:bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg transform active:scale-[0.98] transition-all duration-200"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
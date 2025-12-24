import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./Image/LoginImg.jpg";

export default function Register() {
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>

     
      <div className="relative z-10 w-[55%] max-w-5xl rounded-[32px]  bg-black/40 backdrop-blur-md p-12 shadow-2xl flex justify-center">
        
        {/* Select */}
        <div className="absolute top-4 left-4">
          <select className="bg-black/50 text-white text-sm px-3 py-1.5 rounded-md border border-white/20 outline-none">
            <option>Patient</option>
            <option>Doctor</option>
          </select>
        </div>

       
        <div className="w-full flex flex-col items-center">
          
       
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Registration
          </h1>

          <form
            onSubmit={handleConfirm}
            className="space-y-4 mt-2 flex flex-col items-center"
          >
            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">
                First name
              </label>
              <input
                required
                type="text"
                className="w-full h-[40px] rounded-lg bg-white px-4 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">
                Second name
              </label>
              <input
                required
                type="text"
                className="w-full h-[40px] rounded-lg bg-white px-4 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="Enter your email or phone number.."
                className="w-full h-[40px] rounded-lg bg-white px-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="create password at least 8ch .."
                className="w-full h-[40px] rounded-lg bg-white px-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px] pt-2">
              <label className="block text-white text-sm mb-2">
                Gender
              </label>
              <div className="flex gap-10">
                <label className="flex items-center gap-2 text-white">
                  <input type="radio" name="gender" className="accent-blue-500" />
                  Male
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input type="radio" name="gender" className="accent-blue-500" />
                  Female
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-[333px] h-[38px] mt-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

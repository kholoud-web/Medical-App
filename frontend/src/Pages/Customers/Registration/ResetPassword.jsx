import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./Image/LoginImg.jpg";
import { IoIosArrowBack } from "react-icons/io";

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/reset-success");
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 text-white hover:text-blue-400 transition"
      >
        <IoIosArrowBack size={26} />
      </button>

      <div className="relative z-10 w-[55%] max-w-5xl rounded-[32px] bg-black/40 backdrop-blur-md p-12 shadow-2xl flex justify-center">
        
        <div className="w-full flex flex-col items-center">
          
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Reset Password
          </h2>

          <form className="space-y-6 flex flex-col items-center">
            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">New password</label>
              <input
                type="password"
                className="w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[430px]">
              <label className="block text-white text-sm mb-1">Confirm password</label>
              <input
                type="password"
                className="w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          <button
            onClick={handleConfirm}
            className="w-[333px] h-[38px] mt-20 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}

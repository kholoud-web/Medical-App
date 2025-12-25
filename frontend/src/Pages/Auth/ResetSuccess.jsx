import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./Image/LoginImg.jpg";
import checkImg from "./Image/check.svg"; 
import { IoIosArrowBack } from "react-icons/io";

export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="absolute inset-0 bg-black/40"></div>

      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-20 text-white hover:text-blue-400 transition"
      >
        <IoIosArrowBack size={26} />
      </button>

      <div className="relative z-10 w-[55%] max-w-5xl rounded-[32px]  bg-black/40 backdrop-blur-md p-12 shadow-2xl flex justify-center">
        
        <div className="w-full flex flex-col items-center text-center">
          
          <h1 className="text-2xl font-bold text-white mb-6">
            Reset Password
          </h1>

          <div className="w-[90px] h-[90px] rounded-full flex items-center justify-center mb-6">
            <img
              src={checkImg}
              alt="success"
              className="w-[145px] h-[145px]"
            />
          </div>

          <p className="text-white/90 text-sm mb-1">
            Your password has been reset successfully!
          </p>
          <p className="text-white/70 text-sm mb-8">
            Now you can log in with your new password.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-[333px] h-[38px] rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

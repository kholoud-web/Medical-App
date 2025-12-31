import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-16 bg-blue-50">
        <div className="max-w-lg mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Diagnosis, Simplified</h1>
          <p className="mb-6 text-sm md:text-base">
            Book appointments, explore services, and connect with trusted doctors. Your journey to better health starts here.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        </div>
        <img src="/hero.svg" alt="Doctors" className="w-full md:w-1/2 rounded-3xl"/>
      </section>

  )
}

export default HeroSection
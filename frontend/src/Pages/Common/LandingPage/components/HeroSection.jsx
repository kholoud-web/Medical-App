import React from 'react'

function HeroSection() {
  return (
      <section className="flex justify-between items-center px-8 py-16 bg-blue-50">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Your Diagnosis, Simplified</h1>
          <p className="mb-6">
            Book appointments, explore services, and connect with trusted doctors. Your journey to better health starts here.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded">Get Started</button>
        </div>
        <img src="public/hero.svg" alt="Doctors" className="w-1/2 rounded-3xl"/>
      </section>

  )
}

export default HeroSection
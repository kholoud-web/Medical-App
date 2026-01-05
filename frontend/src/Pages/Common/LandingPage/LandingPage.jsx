import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import FindDoctorSection from "./components/FindDoctorSection";
import WhyChooseUsSections from "./components/WhyChooseUsSections";
import Testimonials from "./components/Testimonials";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* Find a Doctor */}
      <FindDoctorSection />

      {/* Why Choose Us */}
      <WhyChooseUsSections />

      {/* Testimonials */}
      <Testimonials />

      {/* Call To Action */}
      <section className="bg-blue-500 text-white py-16 text-center px-8">
        <h2 className="text-3xl font-bold mb-3">
          Join Thousands of Patients Who Trust Us
        </h2>
        <p className="mb-6 text-blue-100">
          Start your journey to better health today. Create an account and
          access all our services.
        </p>

        {!isAuthenticated && (
          <button
            onClick={handleSignUp}
            className="bg-white text-blue-500 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Sign up now!
          </button>
        )}
      </section>
    </div>
  );
}

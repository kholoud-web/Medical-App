import { FaHeartbeat, FaShieldAlt, FaStethoscope } from "react-icons/fa";

function WhyChooseUsSections() {
  return (
    <section className="bg-white py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
      <p className="text-gray-500 mb-12">
        We’re committed to providing the best healthcare experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <FaHeartbeat className="text-blue-500 text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            AI-Powered Medical Accuracy
          </h3>
          <p className="text-gray-500 text-sm">
            Get fast, data-driven health insights using advanced AI that
            analyzes symptoms, images, and medical files with high precision.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <FaShieldAlt className="text-blue-500 text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Expert Doctor Review</h3>
          <p className="text-gray-500 text-sm">
            Your AI results, medical reports, and treatment plans are securely
            reviewed by certified doctors for reliable guidance.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <FaStethoscope className="text-blue-500 text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            All Your Medical Needs in One Place
          </h3>
          <p className="text-gray-500 text-sm">
            Access diagnosis, treatments, drug checks, physiotherapy,
            appointments, and medical files — all in one simple platform.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSections;

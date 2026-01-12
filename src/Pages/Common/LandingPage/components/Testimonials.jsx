import { FaStar , FaChevronRight , FaChevronLeft } from "react-icons/fa";

function Testimonials() {
  return (
    <section className="bg-blue-50 py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>
    
      <div className="max-w-3xl mx-auto bg-white border border-blue-300 rounded-xl p-8 shadow-sm">
        <div className="flex justify-center mb-4 text-yellow-400">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
    
        <p className="text-gray-600 italic mb-4">
          “HealthCare made it so easy to find a specialist. Booked my appointment
          in minutes and the doctor was excellent!”
        </p>
    
        <p className="font-semibold text-gray-700 mb-6">
          — Jennifer Smith
        </p>
    
        <div className="flex justify-center gap-4">
          <button className="border border-blue-400 p-2 rounded text-blue-500 hover:bg-blue-50">
            <FaChevronLeft />
          </button>
          <button className="border border-blue-400 p-2 rounded text-blue-500 hover:bg-blue-50">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
    
  )
}

export default Testimonials
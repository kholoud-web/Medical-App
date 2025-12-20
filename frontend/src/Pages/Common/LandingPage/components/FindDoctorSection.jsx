import { FaStar, FaSearch } from "react-icons/fa";

function FindDoctorSection() {
  return (
    <section className="px-8 py-16 bg-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Find a Doctor</h2>
      <p className="text-gray-500 text-center mb-12">
        Search and connect with verified healthcare professionals
      </p>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by doctor name or specialty"
          className="border px-4 py-2 w-1/2 rounded-l"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r">
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <img
              src="public/hero.svg"
              alt="Doctor"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="font-bold mt-4">Dr. Emily Chen</h3>
            <p className="text-gray-500">Orthopedic</p>
            <div className="flex items-center mt-2 text-yellow-500">
              <FaStar className="mr-1" /> 4.8
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          View all doctors
        </button>
      </div>
    </section>
  );
}

export default FindDoctorSection;

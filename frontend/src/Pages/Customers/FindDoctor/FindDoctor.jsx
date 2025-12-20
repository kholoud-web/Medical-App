import Filters from "./Filters";
import DoctorCard from "./DoctorCard";
import SearchIcon from "./Icons/imgsearch.svg";
import TaagopIcon from "./Icons/imgtaagop.svg"

export default function FindDoctor() {
  const doctors = Array(6).fill({
    name: "Dr. Emily Chen",
    specialty: "Orthopedic",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Find a Doctor</h1>
        <p className="text-gray-500 text-sm">
          Search our network of verified healthcare professionals and view their profiles
        </p>
      </div>

      {/* Search */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">
  <div className="relative flex-1">
    {/* أيقونة السيرش */}
    <img
      src={SearchIcon}
      alt="search"
      className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-60"
    />

    <input
      type="text"
      placeholder="Doctor name..."
      className="w-full border border-blue-200 rounded-lg pl-9 pr-4 py-2 outline-blue-500"
    />
  </div>
</div>


      {/* Login Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-sm p-8 flex items-center justify-between mb-8">
  <div>
  
    <h3 className="flex items-center gap-2 font-medium text-black-600 -mt-1">
      <img
        src={TaagopIcon}
        alt="info"
        className="w-4 h-4 opacity-70"
      />
      Login to Book Appointments
    </h3>

    <p className="text-sm text-gray-500 mt-1">
      You can browse doctor profiles, but booking requires an account.
    </p>
  </div>

  <button className="bg-blue-600 text-white px-8 py-1 rounded-lg shadow-xl hover:shadow-md hover:bg-blue-700">
    Login
  </button>
</div>


      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <Filters />

        {/* Doctors */}
        <div className="lg:col-span-3">
          <p className="text-sm text-gray-600 mb-4">
            Showing {doctors.length} doctors
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

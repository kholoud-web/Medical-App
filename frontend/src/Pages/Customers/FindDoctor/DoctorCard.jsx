import StarIcon from "./Icons/imgstar.svg";
import LockIcon from "./Icons/imglock.svg";
import imgfinddoctor from "./images/imgfinddoctor.jpg";

export default function DoctorCard({ doctor }) {
  return (
    <div className="border-blue-300 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={imgfinddoctor}
        alt={doctor.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 space-y-1 ">
        <h3 className="font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-500">{doctor.specialty}</p>

        <div className="flex items-center gap-1 text-sm ">
          <img src={StarIcon} alt="star" className="w-4 h-4" />
          <span>{doctor.rating}</span>
        </div>

       
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm">
          <img src={LockIcon} alt="lock" className="w-4 h-4" />
          Login to book
        </button>
      </div>
    </div>
  );
}

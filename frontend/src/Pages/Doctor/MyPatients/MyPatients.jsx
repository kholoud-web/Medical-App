import { IoSearch } from "react-icons/io5";
import PatientsTable from "./components/PatientsTable";
import Pagination from "./components/Pagination";

export default function MyPatients() {
  const patients = [
    {
      name: "Jane Smith",
      id: "P-1001",
      lastVisit: "2025-01-15",
      status: "Active",
      contact: "+1 (555) 123-4567",
      img: "public/patient.png",
    },
  ];

  return (
    <div className="p-10 max-w-screen-xl mx-auto space-y-10">

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900">My Patients</h1>
        <p className="text-primary-black text-lg">
          Manage Patient records and access their profiles
        </p>
      </div>

      {/* Top Controls */}
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="flex items-center border border-blue-500 bg-gray-100 px-4 py-2 rounded-lg w-72 ">
          <IoSearch size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search patient by name"
            className="ml-2 outline-none text-sm w-full bg-gray-100"
          />
        </div>

        {/* Add New Button */}
        <button className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition font-medium">
          + Add New patient
        </button>
      </div>

      {/* Table */}
        <PatientsTable patients={patients} />   

      {/* Pagination */}
        <Pagination />
    </div>
  );
}

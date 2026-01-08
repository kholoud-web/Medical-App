import React, { useEffect, useRef, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MdMoreVert } from "react-icons/md";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removePatient } from "../../../../RiduxToolkit/Slices/patientsSlice";

const PatientRow = ({ patient }) => {
    const dispatch = useDispatch();

  const statusStyles = {
    ACTIVE: "bg-green-100 text-[#016630]",
    DELETED: "bg-red-100 text-[#EF4444]",
  };
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // إغلاق المنيو عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Delete Patient",
    text: `Are you sure you want to block ${patient.name}?`,
    showCancelButton: true,
    confirmButtonColor: "#EF4444",
    cancelButtonColor: "#9CA3AF",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await dispatch(removePatient(patient.id)).unwrap();

    Swal.fire({
      icon: "success",
      title: "Deleted",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete patient",
    });
  }
};


  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 flex items-center gap-3">
        <img src={patient.avatar} className="w-8 h-8 rounded-full" alt={patient.name}/>
        <span className="font-medium text-[#747474]">{patient.name}</span>
      </td>
      <td className="px-6 py-4 text-[#747474]">{patient.age} y</td>
      <td className="px-6 py-4 text-[#747474]">{patient.gender}</td>
      <td className="px-6 py-4 text-[#747474]">
        <i className="fa-solid fa-wave-square text-blue-400 mr-1"></i> {patient.diagnoses}
      </td>
      <td className="px-6 py-4 text-[#747474] text-sm">{patient.lastDiagnosis}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${statusStyles[patient.status]}`}>
          {patient.status}
        </span>
      </td>
      <td className="px-6 py-4 relative" ref={menuRef}>
        <div className="flex justify-center">
          <MdMoreVert
            className="cursor-pointer text-[#747474]"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <div className="absolute right-6 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
            >
              <FaUser />
              View Profile
            </button>

            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              <FaTrash />
              Delete Patient
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PatientRow;

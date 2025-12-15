import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  FiBell,
  FiDollarSign,
  FiFilter,
  FiMapPin,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import Card from "@/components/Common/Card";

const avatarPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23d9e6ff' offset='0'/%3E%3Cstop stop-color='%238fb4ff' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='60' cy='60' r='58' fill='url(%23g)'/%3E%3Ccircle cx='60' cy='50' r='22' fill='%23f4f7ff' stroke='%233868c8' stroke-width='3'/%3E%3Cpath d='M30 104c6-18 22-30 30-30s24 12 30 30' fill='%23f4f7ff' stroke='%233868c8' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E";

const doctors = [
  {
    name: "Dr. Jelen Kaya",
    specialty: "Dermatologist",
    location: "New York",
    rating: "4.9",
    reviews: 270,
  },
  {
    name: "Dr. Samuel Roy",
    specialty: "Cardiologist",
    location: "Boston",
    rating: "4.8",
    reviews: 312,
  },
  {
    name: "Dr. Liza Morgan",
    specialty: "Neurologist",
    location: "Chicago",
    rating: "4.7",
    reviews: 198,
  },
  {
    name: "Dr. Jelen Kaya",
    specialty: "Dermatologist",
    location: "New York",
    rating: "4.9",
    reviews: 270,
  },
];

function DoctorCard({ doctor }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-blue/25 bg-white px-4 py-3 shadow-[0_10px_20px_rgba(56,104,200,0.06)]">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 overflow-hidden border rounded-2xl border-primary-blue/10 bg-gradient-to-br from-primary-blue/15 to-primary-blue/5">
          <img
            src={doctor.image || avatarPlaceholder}
            alt={doctor.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-neutral-800">
            {doctor.name}
          </p>
          <p className="text-sm text-primary-blue">{doctor.specialty}</p>
          <p className="text-sm text-neutral-500">{doctor.location}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-amber-500">
          <FaStar />
          <span className="text-neutral-800">{doctor.rating}</span>
        </div>
        <p className="text-xs text-neutral-500">({doctor.reviews} reviews)</p>
      </div>
    </div>
  );
}

function FilterButton({ icon, label, children }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer btn whitespace-nowrap">
      {icon}
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function Directory() {
  const formattedDate = dayjs("2025-11-18").format("dddd, MMMM D, YYYY");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [location, setLocation] = useState("all");
  const [minRating, setMinRating] = useState("all");

  const specialties = useMemo(
    () => ["all", ...new Set(doctors.map((doc) => doc.specialty))],
    []
  );
  const locations = useMemo(
    () => ["all", ...new Set(doctors.map((doc) => doc.location))],
    []
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doc.location.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        specialty === "all" || doc.specialty === specialty;
      const matchesLocation = location === "all" || doc.location === location;
      const matchesRating =
        minRating === "all" || Number(doc.rating) >= Number(minRating);

      return matchesSearch && matchesSpecialty && matchesLocation && matchesRating;
    });
  }, [location, minRating, search, specialty]);

  return (
    <div className="w-full">
      <div className="flex flex-col max-w-6xl gap-6 mx-auto">
        <div className="flex items-center justify-between px-6 py-4 bg-white border shadow-sm rounded-2xl border-primary-blue/10">
          <div>
            <p className="text-sm font-semibold text-neutral-700">
              Welcome back, Ahmed
            </p>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="transition-colors text-primary-blue/80 hover:text-primary-blue">
              <FiSettings size={20} />
            </button>
            <button className="transition-colors text-primary-blue/80 hover:text-primary-blue">
              <FiBell size={20} />
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full shadow-sm border-primary-blue/20">
              <FaRegUserCircle className="text-primary-blue/80" size={22} />
              <span className="text-sm font-semibold text-neutral-700">
                Ahmed Ahmed
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">
            Hospitals &amp; Doctors Directory
          </h1>
          <p className="text-sm text-neutral-500">
            Search specialists and hospitals and refine the list using the quick
            filters.
          </p>
        </div>

        <Card classname="w-full p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <FiSearch className="absolute -translate-y-1/2 left-3 top-1/2 text-primary-blue" />
              <input
                type="text"
                placeholder="Search drug, doctor or hospital"
                className="w-full pl-10 pr-12 text-sm bg-white border shadow-sm outline-none h-11 rounded-xl border-primary-blue/30 text-neutral-800 placeholder:text-primary-blue/70 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="absolute flex items-center justify-center transition-colors -translate-y-1/2 bg-white border rounded-lg right-2 top-1/2 h-7 w-9 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                <FiFilter size={15} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <FilterButton
                icon={<FiFilter className="text-primary-blue" />}
                label="Filter by specialist"
              >
                <select
                  aria-label="Filter by specialist"
                  className="text-sm font-medium bg-transparent cursor-pointer text-primary-blue focus:outline-none"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialties.map((item) => (
                    <option key={item} value={item} className="text-neutral-700">
                      {item === "all" ? "All" : item}
                    </option>
                  ))}
                </select>
              </FilterButton>
              <FilterButton
                icon={<FiMapPin className="text-primary-blue" />}
                label="Filter by location"
              >
                <select
                  aria-label="Filter by location"
                  className="text-sm font-medium bg-transparent cursor-pointer text-primary-blue focus:outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((item) => (
                    <option key={item} value={item} className="text-neutral-700">
                      {item === "all" ? "All" : item}
                    </option>
                  ))}
                </select>
              </FilterButton>
              <FilterButton
                icon={<FiDollarSign className="text-primary-blue" />}
                label="Prices"
              />
              <FilterButton
                icon={<FaStar className="text-amber-500" />}
                label="Rating"
              >
                <select
                  aria-label="Filter by rating"
                  className="text-sm font-medium bg-transparent cursor-pointer text-primary-blue focus:outline-none"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="all" className="text-neutral-700">
                    All
                  </option>
                  <option value="4.5" className="text-neutral-700">
                    4.5+
                  </option>
                  <option value="4.0" className="text-neutral-700">
                    4.0+
                  </option>
                </select>
              </FilterButton>
            </div>
          </div>

          <div className="space-y-3">
            {filteredDoctors.length === 0 ? (
              <div className="px-4 py-6 text-sm text-center bg-white border rounded-2xl border-primary-blue/20 text-neutral-600">
                No doctors match your filters yet.
              </div>
            ) : (
              filteredDoctors.map((doctor, idx) => (
                <DoctorCard key={`${doctor.name}-${idx}`} doctor={doctor} />
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

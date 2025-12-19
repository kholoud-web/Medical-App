import React from "react";
import dayjs from "dayjs";
import {
  FiBell,
  FiChevronDown,
  FiClock,
  FiFilter,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import Card from "@/components/Common/Card";

const avatarPlaceholder =
  "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=200";

const doctors = [
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
    experience: "15 years experience",
    nextAvailable: "Next Available: Fri, 6:00 PM",
    rating: "4.9",
  },
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
    experience: "15 years experience",
    nextAvailable: "Next Available: Fri, 6:00 PM",
    rating: "4.9",
  },
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
    experience: "15 years experience",
    nextAvailable: "Next Available: Fri, 6:00 PM",
    rating: "4.9",
  },
];

function FilterPill({ label }) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-primary-blue/30 bg-white px-3 py-2 text-sm font-medium text-primary-blue shadow-sm hover:bg-primary-blue/5 transition-colors">
      <span>{label}</span>
      <FiChevronDown size={14} />
    </button>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-blue/30 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(56,104,200,0.08)]">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 overflow-hidden border rounded-2xl border-primary-blue/15 bg-gradient-to-br from-primary-blue/15 to-primary-blue/5">
          <img
            src={avatarPlaceholder}
            alt={doctor.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-neutral-800">
            {doctor.name}
          </p>
          <p className="text-sm font-semibold text-primary-blue">
            {doctor.specialty}
          </p>
          <p className="text-xs text-neutral-500">{doctor.location}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 text-sm text-neutral-600">
        <p>{doctor.experience}</p>
        <p>{doctor.nextAvailable}</p>
      </div>

      <div className="flex items-center gap-1 text-amber-500 font-semibold">
        <FaStar />
        <span className="text-neutral-800">{doctor.rating}</span>
      </div>
    </div>
  );
}

export default function Directory() {
  const formattedDate = dayjs("2025-11-18").format("dddd, MMMM D, YYYY");

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between rounded-[22px] bg-white border border-primary-blue/10 shadow-sm px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-neutral-800">
              Good Morning, Ahmed
            </p>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-primary-blue/80 hover:text-primary-blue transition-colors">
              <FiSettings size={20} />
            </button>
            <button className="text-primary-blue/80 hover:text-primary-blue transition-colors">
              <FiBell size={20} />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-primary-white border border-primary-blue/20 px-3 py-1 shadow-sm">
              <FaRegUserCircle className="text-primary-blue/80" size={22} />
              <span className="text-sm font-semibold text-neutral-700">
                Ahmed Ahmed
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-primary-blue/15 rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 lg:p-7 space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
              Hospitals &amp; Doctors Directory
            </h1>
            <p className="text-sm text-neutral-500">
              Search specialists and hospitals and refine the list using the quick
              filters.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-neutral-700">
            <div className="flex items-center gap-2">
              <FiFilter className="text-primary-blue" />
              <span>Filters:</span>
            </div>
            <button className="text-primary-blue text-xs font-semibold hover:underline">
              Reset Filters
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterPill label="Location" />
            <FilterPill label="Experience" />
            <FilterPill label="Availability" />
            <FilterPill label="Rate" />
          </div>

          <Card classname="w-full p-4 lg:p-5 space-y-3">
            {doctors.map((doctor, idx) => (
              <DoctorCard key={`${doctor.name}-${idx}`} doctor={doctor} />
            ))}
          </Card>

          <div className="flex justify-end">
            <button className="px-6 py-3 text-sm font-semibold rounded-3xl bg-primary-blue text-white shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

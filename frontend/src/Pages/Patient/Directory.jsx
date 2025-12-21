import React from "react";
import { FiChevronDown, FiClock, FiFilter, FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Card from "@/components/Common/Card";
import { useLocale } from "@/context/LocaleContext";

const avatarPlaceholder =
  "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=200";

const doctors = [
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
    rating: "4.9",
  },
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
    rating: "4.9",
  },
  {
    name: "Dr. Jelen Kaya",
    specialty: "Physiotherapy",
    location: "New York",
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

function DoctorCard({ doctor, experience, nextAvailable }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-blue bg-white px-4 py-3">
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
        <p>{experience}</p>
        <p>{nextAvailable}</p>
      </div>

      <div className="flex items-center gap-1 text-amber-500 font-semibold">
        <FaStar />
        <span className="text-neutral-800">{doctor.rating}</span>
      </div>
    </div>
  );
}

export default function Directory() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-5xl px-4 lg:px-6 py-10">
        <div className="bg-white border border-primary-blue rounded-[18px] shadow-sm p-6 lg:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
                {t("directory.title")}
              </h1>
              <p className="text-sm text-neutral-500">
                {t("directory.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary-blue">
              <FiFilter />
              <span className="text-sm font-semibold">{t("directory.filters")}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-neutral-700">
            <FilterPill label={t("directory.filter.location")} />
            <FilterPill label={t("directory.filter.experience")} />
            <FilterPill label={t("directory.filter.availability")} />
            <FilterPill label={t("directory.filter.rate")} />
            <button className="text-primary-blue text-xs font-semibold hover:underline ml-auto">
              {t("directory.reset")}
            </button>
          </div>

          <Card classname="w-full p-4 lg:p-5 space-y-3">
            {doctors.map((doctor, idx) => (
              <DoctorCard
                key={`${doctor.name}-${idx}`}
                doctor={doctor}
                experience={t("directory.doctor.experience")}
                nextAvailable={t("directory.doctor.nextAvailable")}
              />
            ))}
          </Card>

          <div className="flex justify-end">
            <button className="px-6 py-3 text-sm font-semibold rounded-3xl bg-primary-blue text-white shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition">
              {t("directory.confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

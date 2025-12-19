import React, { useState } from "react";
import dayjs from "dayjs";
import {
  FiBell,
  FiCheckCircle,
  FiCreditCard,
  FiSettings,
  FiSmartphone,
  FiTrendingUp,
} from "react-icons/fi";
import { FaRegUserCircle, FaUniversity } from "react-icons/fa";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

const paymentTypes = [
  { id: "consultation", label: "Paid for Consultation" },
  { id: "prescription", label: "Paid for Prescription" },
];

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: FiCreditCard },
  { id: "wallet", label: "Mobile Wallet", icon: FiSmartphone },
  { id: "bank", label: "Bank Transfer", icon: FaUniversity },
];

function PillButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${
        active
          ? "border-primary-blue bg-primary-blue text-white"
          : "border-primary-blue/40 bg-white text-neutral-700 hover:bg-primary-blue/5"
      }`}
    >
      {children}
    </button>
  );
}

function MethodButton({ method, active, onClick }) {
  const Icon = method.icon;
  return (
    <button
      type="button"
      onClick={() => onClick(method.id)}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${
        active
          ? "border-primary-blue bg-primary-blue/5 text-primary-blue"
          : "border-primary-blue/30 bg-white text-neutral-700 hover:bg-primary-blue/5"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <span>{method.label}</span>
      </div>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          active ? "border-primary-blue bg-primary-blue text-white" : "border-primary-blue/40 text-transparent"
        }`}
      >
        <FiCheckCircle size={12} />
      </span>
    </button>
  );
}

export default function Payment() {
  const formattedDate = dayjs("2025-11-18").format("dddd, MMMM D, YYYY");
  const [selectedType, setSelectedType] = useState("consultation");
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between rounded-[22px] bg-white border border-primary-blue/10 shadow-sm px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-neutral-800">Welcome back, Ahmed</p>
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
              <span className="text-sm font-semibold text-neutral-700">Ahmed Ahmed</span>
            </div>
          </div>
        </div>

        <Card classname="w-full p-6 lg:p-7 space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">Payment</h1>
            <PrimButton className="px-5 py-2 text-sm shadow-sm hover:shadow-md flex items-center gap-2">
              <FiTrendingUp size={16} />
              View History
            </PrimButton>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {paymentTypes.map((type) => (
                  <PillButton
                    key={type.id}
                    active={selectedType === type.id}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.label}
                  </PillButton>
                ))}
              </div>

              <div className="rounded-2xl border border-primary-blue/20 bg-white shadow-sm p-5 space-y-3">
                <p className="text-sm font-semibold text-neutral-800">Enter Details</p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Cardholder's name"
                    className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Expiration date"
                      className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV/CVC"
                      className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-neutral-800">Choose Payment Method</p>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <MethodButton
                    key={method.id}
                    method={method}
                    active={selectedMethod === method.id}
                    onClick={setSelectedMethod}
                  />
                ))}
              </div>

              <div className="pt-4">
                <PrimButton className="w-full sm:w-auto px-6 py-3 text-sm shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition">
                  Confirm
                </PrimButton>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

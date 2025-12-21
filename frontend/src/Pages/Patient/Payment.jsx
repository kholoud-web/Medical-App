import React, { useState } from "react";
import {
  FiCheckCircle,
  FiCreditCard,
  FiSmartphone,
  FiTrendingUp,
} from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";

const paymentTypes = [
  { id: "consultation", labelKey: "payment.type.consultation" },
  { id: "prescription", labelKey: "payment.type.prescription" },
];

const paymentMethods = [
  { id: "card", labelKey: "payment.method.card", icon: FiCreditCard },
  { id: "wallet", labelKey: "payment.method.wallet", icon: FiSmartphone },
  { id: "bank", labelKey: "payment.method.bank", icon: FaUniversity },
];

function PillButton({ active, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${active
        ? "border-primary-blue bg-primary-blue text-white"
        : "border-primary-blue/40 bg-white text-neutral-700 hover:bg-primary-blue/5"
        } ${className}`}
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
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${active
        ? "border-primary-blue bg-primary-blue/5 text-primary-blue shadow-sm"
        : "border-primary-blue/30 bg-white text-neutral-700 hover:bg-primary-blue/5"
        }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <span>{method.label}</span>
      </div>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-primary-blue bg-primary-blue text-white" : "border-primary-blue/40 text-transparent"
          }`}
      >
        <FiCheckCircle size={12} />
      </span>
    </button>
  );
}

export default function Payment() {
  const [selectedType, setSelectedType] = useState("consultation");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="rounded-[22px] border border-primary-blue bg-white shadow-sm p-6 lg:p-7 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
              {t("payment.title")}
            </h1>

          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {paymentTypes.map((type) => (
                  <PillButton
                    key={type.id}
                    active={selectedType === type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="min-w-[180px]"
                  >
                    {t(type.labelKey)}
                  </PillButton>
                ))}
              </div>

              <div className="rounded-2xl border border-primary-blue bg-white shadow-sm p-5 space-y-3">
                <p className="text-sm font-semibold text-neutral-800">
                  {t("payment.enterDetails")}
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={t("payment.cardholder")}
                    className="w-full h-10 rounded-lg border border-primary-blue/40 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t("payment.cardNumber")}
                    className="w-full h-10 rounded-lg border border-primary-blue/40 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={t("payment.expiry")}
                      className="w-full h-10 rounded-lg border border-primary-blue/40 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder={t("payment.cvv")}
                      className="w-full h-10 rounded-lg border border-primary-blue/40 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-neutral-800">
                {t("payment.method.title")}
              </p>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <MethodButton
                    key={method.id}
                    method={{ ...method, label: t(method.labelKey) }}
                    active={selectedMethod === method.id}
                    onClick={setSelectedMethod}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <PrimButton className="px-6 py-3 text-sm shadow-[0_8px_20px_rgba(56,104,200,0.18)] hover:-translate-y-0.5 transition rounded-full">
              {t("payment.confirm")}
            </PrimButton>
          </div>
        </div>
      </div>
    </div>
  );
}

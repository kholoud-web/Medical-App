import React from "react";
import dayjs from "dayjs";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

const transactions = [
  { id: "INV-1034", item: "Consultation - Dermatology", date: "2025-02-05", amount: "$120.00", status: "Paid" },
  { id: "INV-1028", item: "Lab Tests - Blood Panel", date: "2025-01-22", amount: "$85.00", status: "Paid" },
  { id: "INV-1019", item: "Imaging - MRI Scan", date: "2025-01-08", amount: "$640.00", status: "Pending" },
];

function StatusPill({ status }) {
  const isPaid = status === "Paid";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function Payment() {
  const formattedDate = dayjs().format("dddd, MMMM D, YYYY");

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between rounded-2xl border border-primary-blue/10 bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-neutral-700">Payment Center</p>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
          <PrimButton className="px-5 py-2 text-sm shadow-sm hover:shadow-md">Add Payment Method</PrimButton>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Payments</h1>
          <p className="text-sm text-neutral-500">Review your invoices, status, and upcoming payments.</p>
        </div>

        <Card classname="w-full p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-neutral-700">Outstanding Balance</p>
              <p className="text-2xl font-bold text-neutral-900">$640.00</p>
              <p className="text-xs text-neutral-500">Due on 12 Feb 2025</p>
            </div>
            <PrimButton className="px-6 py-2 text-sm shadow-sm hover:shadow-md">Pay Now</PrimButton>
          </div>
        </Card>

        <Card classname="w-full p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Recent Transactions</h2>
            <PrimButton className="px-4 py-2 text-xs shadow-sm hover:shadow-md">Download Statement</PrimButton>
          </div>

          <div className="divide-y divide-primary-blue/10 rounded-2xl border border-primary-blue/20 bg-white shadow-[0_10px_20px_rgba(56,104,200,0.04)]">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{txn.item}</p>
                  <p className="text-xs text-neutral-500">{txn.id} • {dayjs(txn.date).format("MMM D, YYYY")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold text-neutral-800">{txn.amount}</p>
                  <StatusPill status={txn.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

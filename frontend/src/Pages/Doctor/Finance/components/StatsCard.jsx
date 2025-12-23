import React from "react";

export default function StatCard({ title, value, hint, positive }) {
  return (
    <div className="bg-treat-bg-Gray rounded-xl border border-primary-blue/50 p-4 flex flex-col gap-2 shadow-sm">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      {hint && (
        <p className={`text-sm ${positive ? "text-green-500" : "text-gray-400"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

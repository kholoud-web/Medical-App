import React from "react";
import BarChar from "@/components/Doctor/Dashborad/BarChar"
import EarningsChart from "@/components/Doctor/Dashborad/EarningsChart"
import PieChar from "./PieChar"


function ChartsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Revenue per Session */}
      <div className="bg-treat-bg-Gray rounded-xl border border-primary-blue/50 shadow-sm">
        <h2 className="font-semibold text-lg mb-4 m-4">
          Revenue per Session Type
        </h2>
        <div className="h-64 mr-4">
          <BarChar show={false} />
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-treat-bg-Gray rounded-xl border border-primary-blue/50 justify-between shadow-sm">
        <h2 className="font-semibold text-lg mb-14 m-4">Monthly Earnings</h2>

        <div className="mr-4 ">
          <EarningsChart type="linear" filling={false} />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-treat-bg-Gray rounded-xl border border-primary-blue/50 p-4 shadow-sm flex flex-col justify-between">
        <h2 className="font-semibold text-lg mb-4">Payment Methods</h2>
        <PieChar />
      </div>
    </div>
  );
}

export default ChartsSection;

import React from "react";
import StatCard from "./components/StatsCard";
import PrimButton from "@/components/Common/PrimButton";
import TransactionsTable from "./components/TransactionsTable";
import ChartsSection from "./components/ChartsSection";
import { useNavigate } from "react-router-dom";



const stats = [
  { title: "Total Earnings", value: "$25,800", hint: "+10.2% vs last month", positive: true },
  { title: "Monthly Growth", value: "+23.4%", hint: "+5.2% vs last month", positive: true },
  { title: "Pending Withdrawals", value: "$3,420", hint: "2 requests vs last month" },
  { title: "Average Session Income", value: "$320", hint: "Stable" },
];

const transactions = [
  { id: "TXN-2024-1145", patient: "Mohamed", session: "Consultation", amount: "$250.00", date: "Nov 18, 2024", status: "Completed" },
  { id: "TXN-2024-1146", patient: "Sara", session: "Consultation", amount: "$150.00", date: "Nov 18, 2024", status: "Pending" },
  { id: "TXN-2024-1147", patient: "Ali", session: "Consultation", amount: "$200.00", date: "Nov 18, 2024", status: "Cancelled" },
];



function FinanceDashboard() {
  
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Finance Dashboard</h1>
          <p className="text-gray-500">
            Monitor your earnings and financial performance
          </p>
        </div>

        <PrimButton className="px-5 py-2"  onClick={() => navigate("/withdrawal")}>
          Request withdrawal
        </PrimButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Charts Section */}
      <ChartsSection />
      {/* Transactions */}

     <TransactionsTable transactions={transactions} />

    </div>
  );
}

export default FinanceDashboard;

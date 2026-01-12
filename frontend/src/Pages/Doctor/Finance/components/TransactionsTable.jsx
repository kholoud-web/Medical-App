import CustomFilter from "@/components/Doctor/Dashborad/CustomFilter";
import React from "react";
import { useState } from "react";



export default function TransactionsTable({ transactions }) { 
const [filterOptions, setFilteredOptions] = useState([
    { title: "Completed", active: true },
    { title: "Pending", active: false },
    { title: "Cancelled", active: false },
  ]);

  function handleOnFilterChange(selected) {
    setFilteredOptions((prev) =>
      prev.map((prevOption) => ({
        ...prevOption,
        active: prevOption.title === selected.title,
      }))
    );
  }
  return (
    <div className="bg-treat-bg-Gray rounded-xl border border-primary-blue/50 p-4 shadow-sm">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="font-semibold text-lg">Recent Transactions</h2>
       <CustomFilter options={filterOptions} handleClick={handleOnFilterChange} />
     </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-gray-400">
            <th className="py-2 text-left">Transaction ID</th>
            <th>Patient</th>
            <th>Session</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className="border-t text-center">
              <td className="py-2 text-left">{tx.id}</td>
              <td>{tx.patient}</td>
              <td>{tx.session}</td>
              <td>{tx.amount}</td>
              <td>{tx.date}</td>
              <td
                className={
                  tx.status === "Completed"
                    ? "text-green-500"
                    : tx.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              >
                {tx.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

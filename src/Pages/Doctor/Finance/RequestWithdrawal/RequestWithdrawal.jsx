import React, { useState } from "react";

const AVAILABLE_BALANCE = 3420;
const MIN_WITHDRAWAL = 50;

export default function RequestWithdrawal() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    setAmount(e.target.value);

    if (value > AVAILABLE_BALANCE) {
      setError("Amount exceeds available balance");
    } else if (value < MIN_WITHDRAWAL) {
      setError(`Minimum withdrawal is $${MIN_WITHDRAWAL}`);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && amount >= MIN_WITHDRAWAL) {
      console.log({ amount, method });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Request Withdrawal</h2>

      {/* Balance Info */}
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-lg font-bold">${AVAILABLE_BALANCE.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Minimum Withdrawal</p>
          <p className="font-semibold">${MIN_WITHDRAWAL}</p>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Withdrawal Amount</label>
        <input
          type="number"
          placeholder="Enter amount to withdraw"
          className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={handleAmountChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <p className="font-medium mb-2">Payment Method</p>

        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="method"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit Card (35%)
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="method"
              checked={method === "bank"}
              onChange={() => setMethod("bank")}
            />
            Bank Transfer (35%)
          </label>
        </div>
      </div>

      {/* Account Details */}
      <div className="mb-6">
        <p className="font-medium mb-2">Account Details</p>

        {method === "bank" ? (
          <div className="space-y-2">
            <input className="input" placeholder="Bank Name" />
            <input className="input" placeholder="Account Number / IBAN" />
            <input className="input" placeholder="Holder Name" />
          </div>
        ) : (
          <div className="space-y-2">
            <input className="input" placeholder="Card Number" />
            <input className="input" placeholder="Expiry Date" />
            <input className="input" placeholder="Card Holder" />
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Withdrawals are processed within 2–5 business days.  
          A 2% transaction fee may apply.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

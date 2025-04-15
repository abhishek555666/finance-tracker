"use client";

import { useState } from "react";

type Transaction = {
  description: string;
  amount: number;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    if (!description || !amount) return;
    const newTransaction: Transaction = {
      description,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">💰 Finance Tracker</h1>

      <div className="mb-4 w-full max-w-md">
        <input
          className="border rounded px-3 py-2 mr-2 w-[60%]"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 mr-2 w-[30%]"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 sm:mt-0"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <ul className="mb-4">
          {transactions.map((t, i) => (
            <li
              key={i}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{t.description}</span>
              <span
                className={
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }
              >
                ₹{t.amount}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-md font-medium">
          <p>Total Income: <span className="text-green-600">₹{income}</span></p>
          <p>Total Expenses: <span className="text-red-600">₹{expenses}</span></p>
        </div>
      </div>
    </main>
  );
}

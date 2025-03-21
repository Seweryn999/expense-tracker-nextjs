"use client";

import { useState } from "react";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseEditFormProps {
  expense: Expense;
  onSave: (updatedExpense: Expense) => void;
  onCancel: () => void;
}

export default function ExpenseEditForm({
  expense,
  onSave,
  onCancel,
}: ExpenseEditFormProps) {
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...expense,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-200 rounded shadow mt-4"
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded w-full mt-2"
      >
        <option value="Jedzenie">🍔 Jedzenie</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Rozrywka">🎮 Rozrywka</option>
      </select>
      <button type="submit" className="p-2 bg-green-500 text-white w-full mt-2">
        💾 Zapisz
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="p-2 bg-gray-500 text-white w-full mt-2"
      >
        ❌ Anuluj
      </button>
    </form>
  );
}

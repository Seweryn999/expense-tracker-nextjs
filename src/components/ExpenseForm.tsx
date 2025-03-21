"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { db, auth, logTransaction } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface ExpenseFormProps {
  onExpenseAdded: (newExpense: {
    id: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
}

export default function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !amount || !category) return;

    setLoading(true);
    try {
      const expenseRef = await addDoc(collection(db, "expenses"), {
        userId: auth.currentUser.uid,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
        timestamp: serverTimestamp(),
      });

      await logTransaction(
        auth.currentUser.uid,
        "add",
        parseFloat(amount),
        category
      );

      console.log("✅ Wydatek dodany, ID:", expenseRef.id);

      onExpenseAdded({
        id: expenseRef.id,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
      });

      setAmount("");
      setCategory("");
    } catch (error) {
      console.error("❌ Błąd dodawania wydatku:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
      <input
        type="number"
        placeholder="Kwota"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded w-full"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded w-full mt-2"
        required
      >
        <option value="">Wybierz kategorię</option>
        <option value="Jedzenie">Jedzenie 🍔</option>
        <option value="Transport">Transport 🚗</option>
        <option value="Rozrywka">Rozrywka 🎮</option>
      </select>
      <button
        type="submit"
        className="p-2 bg-green-500 flex items-center justify-center gap-2 text-white w-full mt-2"
        disabled={loading}
      >
        <PlusCircleIcon className="h-5 w-5" />
        {loading ? "Dodawanie..." : "Dodaj wydatek"}
      </button>
    </form>
  );
}

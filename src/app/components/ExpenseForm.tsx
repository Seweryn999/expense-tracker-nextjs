import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    await addDoc(collection(db, "expenses"), {
      userId: auth.currentUser.uid,
      amount: parseFloat(amount),
      category,
      createdAt: new Date(),
    });

    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
      <input
        type="number"
        placeholder="Kwota"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Kategoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded w-full mt-2"
      />
      <button type="submit" className="p-2 bg-green-500 text-white w-full mt-2">
        Dodaj wydatek
      </button>
    </form>
  );
}

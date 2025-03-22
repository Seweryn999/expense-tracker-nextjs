"use client";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { db, auth, logTransaction } from "../lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const fetchCategories = async () => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "categories"),
      where("userId", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    const fetchedCategories = snapshot.docs.map((doc) => doc.data().name);
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleAddCategory = async () => {
    if (!auth.currentUser || !newCategory.trim()) return;

    const formattedCategory = newCategory.trim();

    if (categories.includes(formattedCategory)) {
      alert("Kategoria już istnieje!");
      return;
    }

    try {
      await setDoc(
        doc(db, "categories", `${auth.currentUser.uid}_${formattedCategory}`),
        {
          userId: auth.currentUser.uid,
          name: formattedCategory,
          createdAt: serverTimestamp(),
        }
      );

      setCategories((prev) => [...prev, formattedCategory]);
      setNewCategory("");
    } catch (error) {
      console.error("❌ Błąd dodawania kategorii:", error);
    }
  };

  const handleDeleteCategory = async (catToDelete: string) => {
    if (!auth.currentUser) return;

    try {
      await deleteDoc(
        doc(db, "categories", `${auth.currentUser.uid}_${catToDelete}`)
      );
      setCategories(categories.filter((cat) => cat !== catToDelete));
    } catch (error) {
      console.error("❌ Błąd usuwania kategorii:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <form onSubmit={handleSubmit}>
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
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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

      {/* Toggle show/hide category manager */}
      <div className="mt-6">
        <button
          onClick={() => setShowCategories((prev) => !prev)}
          className="text-sm text-indigo-600 hover:underline focus:outline-none"
        >
          {showCategories
            ? "▲ Ukryj zarządzanie kategoriami"
            : "▼ Zarządzaj kategoriami"}
        </button>

        {showCategories && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold">📂 Kategorie użytkownika</h3>
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                placeholder="Nowa kategoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Dodaj
              </button>
            </div>

            <ul className="mt-4">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="flex justify-between items-center bg-white p-2 rounded shadow mb-2"
                >
                  {cat}
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

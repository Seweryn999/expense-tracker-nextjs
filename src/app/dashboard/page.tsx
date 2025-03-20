"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (userId?: string) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      let q = query(collection(db, "expenses"), where("userId", "==", userId));

      try {
        q = query(q, orderBy("date", "desc"));
      } catch {
        console.warn("⚠️ Brak indeksu, sortowanie zostanie pominięte.");
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        category: doc.data().category,
        date: doc.data().date,
      }));

      setExpenses(data);
    } catch (error) {
      console.error("❌ Błąd pobierania wydatków:", error);
      setError("Nie można pobrać wydatków. Sprawdź indeksy w Firestore.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchExpenses(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, fetchExpenses]);

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
      {user ? (
        <>
          <p className="text-lg mb-4">Witaj, {user.email}!</p>

          <ExpenseForm onExpenseAdded={handleExpenseAdded} />

          <ExpenseChart expenses={expenses} />

          <div className="mt-6 text-left">
            <h2 className="text-2xl font-bold mb-4">📝 Lista wydatków</h2>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
              <p className="text-gray-500">Ładowanie wydatków...</p>
            ) : expenses.length > 0 ? (
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id} className="border-b p-2">
                    <span className="font-bold">{expense.category}:</span>{" "}
                    {expense.amount} zł -{" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Brak wydatków do wyświetlenia.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500 text-lg">⏳ Przekierowywanie...</p>
      )}
    </div>
  );
}

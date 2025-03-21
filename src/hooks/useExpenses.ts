import { useState, useCallback, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (userId?: string) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      let q = query(collection(db, "expenses"), where("userId", "==", userId));
      q = query(q, orderBy("date", "desc"));

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Expense[];

      setExpenses(data);
    } catch (error) {
      console.error("Błąd pobierania wydatków:", error);
      setError("Nie można pobrać wydatków.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchExpenses(user.uid);
    });

    return () => unsubscribe();
  }, [fetchExpenses]);

  return { expenses, loading, error, setExpenses };
};

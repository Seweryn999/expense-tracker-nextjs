import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Expense {
  id: string;
  amount: number;
  category: string;
  createdAt: string;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const fetchExpenses = async () => {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        setExpenses(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Expense))
        );
      };

      fetchExpenses();
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!auth.currentUser) return;

    await deleteDoc(doc(db, "expenses", id));
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setNewAmount(expense.amount.toString());
    setNewCategory(expense.category);
  };

  const handleUpdate = async () => {
    if (!editingId || !auth.currentUser) return;

    const expenseRef = doc(db, "expenses", editingId);
    await updateDoc(expenseRef, {
      amount: parseFloat(newAmount),
      category: newCategory,
    });

    setExpenses(
      expenses.map((expense) =>
        expense.id === editingId
          ? { ...expense, amount: parseFloat(newAmount), category: newCategory }
          : expense
      )
    );

    setEditingId(null);
    setNewAmount("");
    setNewCategory("");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">📊 Lista wydatków</h2>
      {expenses.length === 0 ? (
        <p>Brak wydatków</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-2 border-b flex justify-between items-center"
          >
            {editingId === expense.id ? (
              <>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="border p-1"
                />
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border p-1 ml-2"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white p-1 rounded ml-2"
                >
                  Zapisz
                </button>
              </>
            ) : (
              <>
                <p>
                  {expense.category}: <strong>{expense.amount} zł</strong>
                </p>
                <div>
                  <button
                    onClick={() => handleEdit(expense)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Usuń
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

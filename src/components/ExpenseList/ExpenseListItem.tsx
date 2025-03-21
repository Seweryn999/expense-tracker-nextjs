"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { auth, db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import ExpenseEditForm from "../ExpenseEditForm";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListItemProps {
  expense: Expense;
  onExpenseDeleted: (id: string) => void;
  onExpenseUpdated: (updatedExpense: Expense) => void;
}

export default function ExpenseListItem({
  expense,
  onExpenseDeleted,
  onExpenseUpdated,
}: ExpenseListItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!auth.currentUser) return;

    try {
      await deleteDoc(doc(db, "expenses", expense.id));
      onExpenseDeleted(expense.id);
    } catch (error) {
      console.error("❌ Błąd usuwania wydatku:", error);
    }
  };

  if (isEditing) {
    return (
      <ExpenseEditForm
        expense={expense}
        onSave={(updatedExpense: Expense) => {
          onExpenseUpdated(updatedExpense);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="p-2 border-b flex justify-between items-center">
      <p className="flex-1">
        <strong>{expense.category}:</strong> {expense.amount} zł -{" "}
        {new Date(expense.date).toLocaleDateString()}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-3 py-1 flex items-center gap-1 rounded shadow"
        >
          <PencilSquareIcon className="h-4 w-4" /> Edytuj
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 flex items-center gap-1 rounded shadow"
        >
          <TrashIcon className="h-4 w-4" /> Usuń
        </button>
      </div>
    </div>
  );
}

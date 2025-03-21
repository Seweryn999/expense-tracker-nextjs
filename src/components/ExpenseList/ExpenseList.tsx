"use client";

import ExpenseListItem from "./ExpenseListItem";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onExpensesChanged: (updatedExpenses: Expense[]) => void;
}

export default function ExpenseList({
  expenses,
  onExpensesChanged,
}: ExpenseListProps) {
  const handleExpenseDeleted = (id: string) => {
    onExpensesChanged(expenses.filter((expense) => expense.id !== id));
  };

  const handleExpenseUpdated = (updatedExpense: Expense) => {
    onExpensesChanged(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">📊 Lista wydatków</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">Brak wydatków</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseListItem
            key={expense.id}
            expense={expense}
            onExpenseDeleted={handleExpenseDeleted}
            onExpenseUpdated={handleExpenseUpdated}
          />
        ))
      )}
    </div>
  );
}

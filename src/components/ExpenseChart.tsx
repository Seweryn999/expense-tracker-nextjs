"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF4D4D",
];

interface Expense {
  id: string;
  amount: number;
  category: string;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    if (!expenses.length) return;

    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const formattedData = Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));

    setChartData(formattedData);
  }, [expenses]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📊 Wydatki według kategorii</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">
          Brak wydatków do wyświetlenia.
        </p>
      )}
    </div>
  );
}

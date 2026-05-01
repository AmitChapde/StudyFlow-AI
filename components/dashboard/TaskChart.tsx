"use client";

import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function TaskChart({
  completed,
  pending,
}: {
  completed: number;
  pending: number;
}) {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <PieChart width={260} height={260}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        <Cell />
        <Cell />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
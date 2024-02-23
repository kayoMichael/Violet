"use client";
import { Ticket } from "@prisma/client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12. As of now, the library maintainers have not fixed this issue.
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface Props {
  tickets: Ticket[];
}

export function Charts({ tickets }: Props) {
  const data = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 0,
    },
    {
      name: "Mar",
      total: 0,
    },
    {
      name: "Apr",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "Jun",
      total: 0,
    },
    {
      name: "Jul",
      total: 0,
    },
    {
      name: "Aug",
      total: 0,
    },
    {
      name: "Sep",
      total: 0,
    },
    {
      name: "Oct",
      total: 0,
    },
    {
      name: "Nov",
      total: 0,
    },
    {
      name: "Dec",
      total: 0,
    },
  ];
  const date = new Date();
  tickets.forEach((ticket) => {
    if (new Date(ticket.date).getFullYear() !== date.getFullYear()) return;
    const month = new Date(ticket.date).getMonth();
    data[month].total += 1;
  });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

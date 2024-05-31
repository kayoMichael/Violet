'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import type { Ticket } from '@prisma/client';

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12. As of now, the library maintainers have not fixed this issue.
// @link https://github.com/recharts/recharts/issues/3615
/* eslint-disable */
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
/* eslint-enable */

interface Props {
  tickets: Ticket[];
}

export function Charts({ tickets }: Props) {
  const data = [
    {
      name: 'Jan',
      total: 0,
    },
    {
      name: 'Feb',
      total: 0,
    },
    {
      name: 'Mar',
      total: 0,
    },
    {
      name: 'Apr',
      total: 0,
    },
    {
      name: 'May',
      total: 0,
    },
    {
      name: 'Jun',
      total: 0,
    },
    {
      name: 'Jul',
      total: 0,
    },
    {
      name: 'Aug',
      total: 0,
    },
    {
      name: 'Sep',
      total: 0,
    },
    {
      name: 'Oct',
      total: 0,
    },
    {
      name: 'Nov',
      total: 0,
    },
    {
      name: 'Dec',
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
    <ResponsiveContainer height={350} width='100%'>
      <BarChart data={data}>
        <XAxis
          axisLine={false}
          dataKey='name'
          fontSize={12}
          stroke='#888888'
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          fontSize={12}
          stroke='#888888'
          tickFormatter={(value) => `${value}`}
          tickLine={false}
        />
        <Bar
          className='fill-primary'
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

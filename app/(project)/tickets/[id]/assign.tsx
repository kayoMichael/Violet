'use client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

import type { User } from '@prisma/client';

import 'react-loading-skeleton/dist/skeleton.css';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AssignTicket = () => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () =>
      await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => await res.json()),
    staleTime: 60 * 1000,
  });
  if (isLoading) return <Skeleton circle={true} height='3rem' width='6rem' />;
  return (
    <Select>
      <SelectTrigger className='w-auto h-12'>
        <SelectValue placeholder='Assign...' />
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssignTicket;

import React from 'react';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import authOptions from '../../api/auth/authOptions';

import InferName from './inferName';

import { columns } from '@/components/table/columns';
import TicketTable from '@/components/table/ticketTable';
import prisma from '@/prisma/client';

export const dynamic = 'force-dynamic';

const TicketPage = async () => {
  const session: { user: { email: string; id: string; name: string } } | null =
    await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      tickets: true,
    },
  });
  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      <div>
        <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Welcome {user.name}!
              </h2>
              <p className='text-muted-foreground'>
                Here&apos;s a list of your Registered Tickets!
              </p>
            </div>
            <div className='flex items-center space-x-2'></div>
          </div>
          <TicketTable columns={columns} data={user.tickets} />
        </div>
      </div>
      <InferName user={{ name: user.name, id: user.id }} />
    </>
  );
};

export default TicketPage;

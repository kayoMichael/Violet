import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { ticketSchema } from '../../../components/validations/schema';
import authOptions from '../auth/authOptions';

import type { User } from '@prisma/client';
import type { NextRequest } from 'next/server';

import prisma from '@/prisma/client';

export async function POST(request: NextRequest) {
  const session: { user?: User; accountId: string; expires: string } | null =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const ticket = await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description,
      label: body.label,
      status: body.status,
      priority: body.priority,
      email: session.user.email,
      userId: session.user.id,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}

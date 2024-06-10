import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '../../auth/authOptions';

import type { NextRequest } from 'next/server';

import prisma from '@/prisma/client';

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name || undefined,
      email: body.email || undefined,
    },
  });
  return NextResponse.json(user, { status: 200 });
}

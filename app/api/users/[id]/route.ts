import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await prisma?.user.update({
    where: { id },
    data: {
      name: body.name || undefined,
      email: body.email || undefined,
    },
  });
  return NextResponse.json(user, { status: 201 });
}

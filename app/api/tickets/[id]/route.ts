import prisma from "@/prisma/client";
import { ticketSchema } from "@/components/validations/schema";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";

interface Props {
  params: { id: string };
}
export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
      label: body.label,
      status: body.status,
      priority: body.priority,
    },
  });

  return NextResponse.json(updatedTicket, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const deletedTicket = await prisma.ticket.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(deletedTicket, { status: 200 });
}

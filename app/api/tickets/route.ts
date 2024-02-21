import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { ticketSchema } from "../../../components/validations/schema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      email: session.user!.email!,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}

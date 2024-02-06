import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'
import prisma from '@/prisma/client';

const ticketSchema = z.object({
    title: z.string().min(1, { message: "The title must be at least 1 character !"}).max(300, { message: "The title must be at least 300 character!"}),
    description: z.string().min(1, { message: "The submission must be at least 1 character !"})
})

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const ticket = await prisma.ticket.create({
        data: { title: body.title, description: body.description}
    })

    return NextResponse.json(ticket, {status: 201})
}
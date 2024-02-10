import prisma from '@/prisma/client';
import { ticketSchema } from "@/components/validations/schema";
import { NextRequest} from "next/server";
import { NextResponse } from "next/server";

interface Props {
    params: {id: string}
}
export async function PATCH(request: NextRequest, {params: {id}}: Props) {
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const ticket = prisma.ticket.findUnique({
        where: {id: parseInt(id)}
    })

    if (!ticket) {
        return NextResponse.json({error: "Ticket not found"}, {status: 404})
    }

    const updatedTicket = await prisma.ticket.update({
        where: {id: parseInt(id)},
        data: {
            title: body.title,
            description: body.description,
            label: body.label,
            status: body.status,
            priority: body.priority
        }
    })
    
    return NextResponse.json(updatedTicket, {status: 200})
}
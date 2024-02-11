import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const dynamic = "force-dynamic";
export async function GET(NextRequest: NextRequest) {
    const users = await prisma?.user.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return NextResponse.json(users, {status: 200})
}

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { Adapter } from 'next-auth/adapters';
import prisma from "@/prisma/client";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ], 
  session: {
    strategy: 'jwt',
  }
})

export { handler as GET, handler as POST }
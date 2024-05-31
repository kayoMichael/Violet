import { PrismaAdapter } from '@auth/prisma-adapter';
import * as bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { User } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';

import env from '@/lib/env';
import prisma from '@/prisma/client';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'name@exampe.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.username,
            },
          });

          if (!user) {
            return null;
          }

          if (!credentials?.password || !user.password) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          const { password, ...userWithoutPass } = user;
          return userWithoutPass;
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

export default authOptions;

import type { User } from '@prisma/client';

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    account: Account;
  }
}

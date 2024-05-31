'use server';
import * as bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import prisma from '@/prisma/client';

const signUpSchema = z
  .object({
    email: z.string().email('Please Provide a Valid Email Address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export interface returnMessage {
  status: 'error' | 'success' | 'stale';
  email: string[];
  password: string[];
  confirmPassword: string[];
}

const message: returnMessage = {
  status: 'success',
  email: [],
  password: [],
  confirmPassword: [],
};

export const handleSignup = async (_: returnMessage, formData: FormData) => {
  const signUpInfo = {
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = signUpSchema.safeParse(signUpInfo);
  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    message.status = 'error';
    message.email = error?.email ? error.email : [];
    message.password = error?.password ? error.password : [];
    message.confirmPassword = error?.confirmPassword
      ? error.confirmPassword
      : [];
    return message;
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          email: signUpInfo.email.toString(),
          password: await bcrypt.hash(signUpInfo.password.toString(), 10),
        },
      });
      await prisma.account.create({
        data: {
          userId: user.id.toString(),
          type: 'email',
          provider: 'credentials',
          providerAccountId: crypto.randomUUID(),
        },
      });
    } catch {
      message.status = 'error';
      message.email = ['This email is already in use. Please use another.'];
      return message;
    }
  }
  revalidatePath('/auth/signup');
  redirect('/auth/signup/confirmation');
};

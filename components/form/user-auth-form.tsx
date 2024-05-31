'use client';

import * as React from 'react';

import { signIn } from 'next-auth/react';
import { useFormState } from 'react-dom';

import SubmitButton from '../button/submitButton';

import SignUpInput from './signUpInput';

import type { returnMessage } from '@/app/auth/action';
import type { SignInResponse } from 'next-auth/react';

import { Icons } from '@/components/ui/icons';

interface Props {
  serverAction: (
    prevState: returnMessage,
    FormData: FormData
  ) => Promise<returnMessage>;
}

export function UserAuthForm({ serverAction }: Props) {
  const statusState: returnMessage = {
    status: 'stale',
    email: [],
    password: [],
    confirmPassword: [],
  };

  const [state, formAction] = useFormState(serverAction, statusState);

  return (
    <div className='grid gap-4'>
      <form action={formAction}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <SignUpInput state={state} />
            <SubmitButton>Sign Up with Credentials</SubmitButton>
          </div>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      {/* <SubmitButton variant="outline" className="mb-0">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </SubmitButton> */}
      <SubmitButton
        className='mt-0'
        handleClick={async (): Promise<SignInResponse | undefined> =>
          await signIn('google', { callbackUrl: '/tickets' })
        }
        variant='outline'
      >
        <Icons.google className='mr-2 h-4 w-4' />
        Google
      </SubmitButton>
    </div>
  );
}

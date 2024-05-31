import React from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

import type { returnMessage } from '@/app/auth/action';

interface Props {
  state: returnMessage;
}
const SignUpInput = ({ state }: Props) => {
  return (
    <>
      <Label className='sr-only' htmlFor='email'>
        Email
      </Label>
      <Input
        className={state?.email.length !== 0 ? 'border-red-400' : ''}
        id='email'
        name='email'
        placeholder='name@example.com'
      />
      <p className='text-red-400 text-sm'>{state?.email}</p>
      <Input
        autoCapitalize='none'
        autoCorrect='off'
        className={state?.password.length !== 0 ? 'border-red-400' : ''}
        id='Password'
        name='password'
        placeholder='Password'
        type='password'
      />
      <p className='text-red-400 text-sm'>{state?.password}</p>
      <Input
        autoCapitalize='none'
        autoCorrect='off'
        className={state?.confirmPassword.length !== 0 ? 'border-red-400' : ''}
        id='confirmPassword'
        name='confirmPassword'
        placeholder='Confirm Password'
        type='password'
      />
      <p className='text-red-400 text-sm'>{state?.confirmPassword}</p>
    </>
  );
};

export default SignUpInput;

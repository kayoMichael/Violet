'use client';
import React from 'react';

import Image from 'next/image';
import { signOut } from 'next-auth/react';

const SignOutPage = () => {
  return (
    <div className='flex flex-col items-center mt-10 gap-10'>
      <Image alt='violet' height={600} src='/logout.jpg' width={600}></Image>
      <h1>Sorry to See you go!</h1>
      <p>Hope to see you back soon!</p>
      <button
        className='btn btn-primary'
        onClick={async () => {
          await signOut({ callbackUrl: '/' });
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutPage;

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image alt='APO' height={500} src='/apo.webp' width={500}></Image>
      <h1 className='text-4xl font-bold mb-10'>Sign Up Successful!</h1>
      <Button asChild>
        <Link href='/auth/signin'>Proceed to Sign In</Link>
      </Button>
    </div>
  );
};

export default page;

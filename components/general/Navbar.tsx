'use client';
import React from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import 'react-loading-skeleton/dist/skeleton.css';

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <div className='navbar bg-base-100 shadow-md'>
      <div>
        <a
          className='btn btn-ghost text-xl placeholder-sky-100'
          href='/dashboard'
        >
          <h1 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            VioletTrack
          </h1>
        </a>
      </div>
      <div>
        <Link className='btn btn-ghost text-md' href='/dashboard'>
          Dashboard
        </Link>
      </div>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-md' href='/tickets'>
          Tickets
        </Link>
      </div>
      <div className='flex-none'>
        <div>
          {status === 'authenticated' ? (
            <div className='dropdown dropdown-end'>
              <div
                className='btn btn-ghost btn-circle avatar mr-3'
                role='button'
                tabIndex={0}
              >
                <Avatar>
                  <AvatarImage
                    alt='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                    referrerPolicy='no-referrer'
                    src={
                      session?.user?.image ??
                      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <ul
                className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
                tabIndex={0}
              >
                <li>
                  <h1>{session.user?.email}</h1>
                </li>
                <li>
                  <Link href='api/auth/signout'>Log Out</Link>
                </li>
              </ul>
            </div>
          ) : status === 'unauthenticated' ? (
            <Link className='btn btn-ghost text-md' href='api/auth/signin'>
              Log In
            </Link>
          ) : status === 'loading' ? (
            <Skeleton width='3rem' />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

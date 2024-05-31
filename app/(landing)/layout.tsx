import type { ReactNode } from 'react';
import React from 'react';

import type { Metadata } from 'next';

import LandingNavbar from '@/components/general/landingNavbar';

export const metadata: Metadata = {
  title: 'Violet Track',
  description: 'Task and Issue Management APP Built with Next.js 14 and MySQl',
};

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LandingNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;

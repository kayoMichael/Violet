import type { ReactNode } from 'react';
import React from 'react';

import Navbar from '@/components/general/Navbar';
import { Toaster } from '@/components/ui/toaster';

const mainPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default mainPageLayout;

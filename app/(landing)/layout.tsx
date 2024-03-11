import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Violet Track",
  description: "Task and Issue Management APP Built with Next.js 14 and MySQl",
};
import LandingNavbar from "@/components/general/landingNavbar";
const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LandingNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;

import React, { ReactNode } from "react";

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

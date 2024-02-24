import Link from "next/link";
import React from "react";

const LandingNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <a
          href="/auth/signin"
          className="btn btn-ghost text-xl placeholder-sky-100"
        >
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            VioletTrack
          </h1>
        </a>
      </div>
      <div className="navbar-end">
        <Link href="/auth/signin" className="btn btn-primary">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;

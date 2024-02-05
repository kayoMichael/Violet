import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div>
        <Link href="/" className="btn btn-ghost text-xl placeholder-sky-100">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            VioletTrack
          </h1>
        </Link>
      </div>
      <div>
        <Link href="/" className="btn btn-ghost text-md">
          Dashboard
        </Link>
      </div>
      <div>
        <Link href="/" className="btn btn-ghost text-md">
          Issues
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

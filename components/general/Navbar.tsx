import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div>
        <Link href="/" className="btn btn-ghost text-xl placeholder-sky-100">
          VioletTrack
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

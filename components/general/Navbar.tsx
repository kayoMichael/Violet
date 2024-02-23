"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "react-loading-skeleton/dist/skeleton.css";
const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div>
        <a
          href="/dashboard"
          className="btn btn-ghost text-xl placeholder-sky-100"
        >
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            VioletTrack
          </h1>
        </a>
      </div>
      <div>
        <Link href="/dashboard" className="btn btn-ghost text-md">
          Dashboard
        </Link>
      </div>
      <div className="flex-1">
        <Link href="/tickets" className="btn btn-ghost text-md">
          Tickets
        </Link>
      </div>
      <div className="flex-none">
        <div>
          {status === "authenticated" ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-3"
              >
                <Avatar>
                  <AvatarImage
                    alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    src={session?.user!.image!}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <h1>{session.user!.email}</h1>
                </li>
                <li>
                  <Link href="api/auth/signout">Log Out</Link>
                </li>
              </ul>
            </div>
          ) : status === "unauthenticated" ? (
            <Link href="api/auth/signin" className="btn btn-ghost text-md">
              Log In
            </Link>
          ) : status === "loading" ? (
            <Skeleton width="3rem" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

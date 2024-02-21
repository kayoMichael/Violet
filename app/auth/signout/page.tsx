"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const SignOutPage = () => {
  return (
    <div className="flex flex-col items-center mt-10 gap-10">
      <Image src="/logout.jpg" height={600} width={600} alt="violet"></Image>
      <h1>Sorry to See you go!</h1>
      <p>Hope to see you back soon!</p>
      <button
        onClick={() => {
          signOut({ callbackUrl: "/auth/signin" });
        }}
        className="btn btn-primary"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutPage;

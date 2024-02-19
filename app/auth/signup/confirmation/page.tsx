import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/apo.webp" width={500} height={500} alt="APO"></Image>
      <h1 className="text-4xl font-bold mb-10">Sign Up Successful!</h1>
      <Button asChild>
        <Link href="/auth/signin">Proceed to Sign In</Link>
      </Button>
    </div>
  );
};

export default page;

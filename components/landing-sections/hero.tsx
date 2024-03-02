import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="my-20 flex flex-col md:flex-row justify-center items-center text-center md:text-left">
      <div className="w-full max-w-xl lg:mr-10">
        <h1 className="text-5xl font-bold">
          Welcome to{" "}
          <span className="bg-gradient-to-r to-pink-500 from-indigo-500 bg-clip-text text-transparent">
            VioletTrack
          </span>{" "}
        </h1>
        <p className="text-xl py-6">
          An all-in-one Ticket Management System for your business/personal use.
        </p>
        <div className="space-x-2">
          <Link href="/auth/signup" className="btn btn-primary mb-10">
            Get Started
          </Link>
        </div>
      </div>
      <div className="relative w-full md:w-5/12 flex flex-col justify-start items-center gap-16 md:gap-24">
        <Image
          src="/hero.png"
          width="1000"
          height="1000"
          className="rounded-xl"
          alt="Supalaunch"
        ></Image>
      </div>
    </section>
  );
}

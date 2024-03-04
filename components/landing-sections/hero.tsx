"use client";
import heroImage from "@/components/assets/landing/saas-hero.png";
import { Button } from "react-daisyui";
import Image from "next/image";
import Card3d from "card3d";
import { useEffect, useRef } from "react";
import InfiniteSlider from "../slider/infiniteSlider";

const Hero = () => {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroImageRef.current) {
      new Card3d(heroImageRef.current, {
        perspective: 1000,
        fullPageListening: true,
      });
    }
  }, [heroImageRef.current]);

  return (
    <section className="py-8 lg:py-20" id="home">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-black tracking-tighter lg:text-6xl lg:leading-none">
              Make Every day Amazing with
              <span className="text-primary"> Violettrack!! </span>
            </h1>
            <p className=" mt-8 text-lg">
              An All in one task management system with a simple to use UI and
              easy to understand features.
            </p>
            <div className="mt-16 inline-flex gap-3">
              <Button color="primary">Get Started</Button>
              <Button color="ghost">Learn More</Button>
            </div>
          </div>

          <div>
            <div
              className="rounded-2xl bg-gradient-to-r from-indigo-200 via-red-200 to-purple-300 p-3"
              ref={heroImageRef}
            >
              <Image
                alt="SaaS"
                id="hero-image"
                className="rounded-lg"
                src={heroImage}
              />
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-center text-2xl font-semibold text-base-content/60 lg:mt-32">
          Our Partners
        </h2>

        <InfiniteSlider />
      </div>
    </section>
  );
};

export default Hero;

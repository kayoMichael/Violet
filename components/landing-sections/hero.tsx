'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from 'react-daisyui';

import InfiniteSlider from '../slider/infiniteSlider';

import heroImage from '@/components/assets/landing/feature-2.png';

const Hero = () => {
  const router = useRouter();
  return (
    <section className='py-8 lg:py-20' id='home'>
      <div className='container'>
        <div className='grid gap-12 lg:grid-cols-2'>
          <div>
            <h1 className='text-4xl font-black tracking-tighter lg:text-6xl lg:leading-none'>
              Make Every day Amazing with
              <span className='text-primary'> Violettrack!! </span>
            </h1>
            <p className=' mt-8 text-lg'>
              An All in one task management system with a simple to use UI and
              easy to understand features.
            </p>
            <div className='mt-16 inline-flex gap-3'>
              <Button
                color='primary'
                onClick={() => {
                  router.push('/auth/signup');
                }}
              >
                Get Started
              </Button>
              <Button
                color='ghost'
                onClick={() => {
                  router.push('#features');
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div>
            <div className='rounded-2xl bg-gradient-to-r from-indigo-200 via-red-200 to-purple-300 p-3'>
              <Image alt='SaaS' className='rounded-lg' src={heroImage} />
            </div>
          </div>
        </div>

        <h2 className='mt-12 text-center text-2xl font-semibold text-base-content/60 lg:mt-32'>
          Our Partners
        </h2>

        <InfiniteSlider />
      </div>
    </section>
  );
};

export default Hero;

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import authOptions from '../api/auth/authOptions';

import Feature from '@/components/landing-sections/feature';
import FeaturesCards from '@/components/landing-sections/feature-cards';
import Hero from '@/components/landing-sections/hero';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <main className='flex flex-col max-w-6xl px-4 mx-auto space-y-20 gap-10'>
      <Hero />
      <Feature
        description={
          'The table layout presents a comprehensive overview of open tickets, ensuring no detail goes unnoticed. With pagination at your fingertips, navigating through tasks becomes effortless, regardless of the volume. Say goodbye to endless scrolling and hello to swift accessibility.'
        }
        id={'integrations'}
        image={'/sass-feature-1.png'}
        isImageFirst={true}
        title={'Beautiful Table'}
      />
      <Feature
        description={
          "Interactive charts and graphs breathe life into your data, allowing for deep dives into trends and patterns. Whether you're tracking sales performance over time or analyzing user behavior, our intuitive visualization tools transform complex data into actionable insights, enabling you to stay ahead of the curve."
        }
        image={'/sass-feature-2.png'}
        isImageFirst={false}
        title={'A Comprehensive Dashboard'}
      />
      <FeaturesCards />
    </main>
  );
}

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function Feature({
  title,
  description,
  image,
  isImageFirst,
  id,
}: {
  title: string;
  description: string;
  image: string;
  isImageFirst: boolean;
  id?: string;
}) {
  return (
    <section
      className={clsx(
        'flex flex-col justify-center lg:justify-between items-center text-center lg:text-left',
        {
          'md:flex-row-reverse': !isImageFirst,
          'md:flex-row': isImageFirst,
        }
      )}
      id={id}
    >
      <div className='relative w-full md:w-6/12 '>
        <Image
          alt='Supalaunch'
          className='rounded-xl'
          height='1000'
          src={image}
          width='1000'
        ></Image>
      </div>

      <div className='w-full md:w-5/12'>
        <h1 className='text-4xl font-bold text-primary'>{title}</h1>
        <p className='text-xl py-6'>{description}</p>

        <p>
          <Link className='link link-hover text-primary' href='/auth/signup'>
            Learn More
          </Link>
        </p>
      </div>
    </section>
  );
}

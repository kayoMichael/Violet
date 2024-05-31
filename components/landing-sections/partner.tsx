import Image from 'next/image';

export default function Partners() {
  return (
    <section className='flex flex-col justify-center items-center gap-3'>
      <div>
        <span className='text-sm font-bold text-gray-500'>Our Partners</span>
      </div>
      <div className='flex flex-row flex-wrap justify-center  items-center max-w-2xl gap-5'>
        <Image alt='Google' height={100} src='/aston-martin.svg' width={100} />
        <Image alt='Supabase' height={100} src='/porsche.png' width={100} />
        <Image alt='Stripe' height={100} src='/maserati.png' width={100} />
        <Image
          alt='Mailersend'
          height={100}
          src='/rolls-royce.png'
          width={100}
        />
        <Image alt='GitHub' height={100} src='/bentley.png' width={100} />
      </div>
    </section>
  );
}

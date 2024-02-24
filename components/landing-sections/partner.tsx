import Image from "next/image";

export default function Partners() {
  return (
    <section className="flex flex-col justify-center items-center gap-3">
      <div>
        <span className="text-sm font-bold text-gray-500">Our Partners</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center  items-center max-w-2xl gap-5">
        <Image src="/aston-martin.svg" alt="Google" width={100} height={100} />
        <Image src="/porsche.png" alt="Supabase" width={100} height={100} />
        <Image src="/maserati.png" alt="Stripe" width={100} height={100} />
        <Image
          src="/rolls-royce.png"
          alt="Mailersend"
          width={100}
          height={100}
        />
        <Image src="/bentley.png" alt="GitHub" width={100} height={100} />
      </div>
    </section>
  );
}

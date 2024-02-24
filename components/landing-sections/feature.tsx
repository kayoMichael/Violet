import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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
        "flex flex-col justify-center lg:justify-between items-center text-center lg:text-left",
        {
          "md:flex-row-reverse": !isImageFirst,
          "md:flex-row": isImageFirst,
        }
      )}
      id={id}
    >
      <div className="relative w-full md:w-6/12 ">
        <Image
          src={image}
          width="1000"
          height="1000"
          className="rounded-xl"
          alt="Supalaunch"
        ></Image>
      </div>

      <div className="w-full md:w-5/12">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="text-xl py-6">{description}</p>

        <p>
          <Link href="/" className="link link-hover text-primary">
            Learn More
          </Link>
        </p>
      </div>
    </section>
  );
}

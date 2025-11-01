import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Pricing Page <code>pricing/page.tsx</code></h1>
      <div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </div>
      <div className="flex gap-4 text-base font-medium sm:flex-row">

      </div>
    </>
  );
}

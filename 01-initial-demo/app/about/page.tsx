import Image from "next/image";

import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'About - Mi E-commerce', // Título de la página
  description: 'Explora nuestra amplia selección de productos únicos.', // Descripción meta
  keywords: ['e-commerce', 'productos', 'tienda online'],

  openGraph: {
    title: 'Mi E-commerce',
    description: 'La mejor tienda en línea.',
    url: 'https://myecommerce.com/products',
  },
};

export default function About() {
  return (
    <>
      <h1>About Page <code>about/page.tsx</code></h1>
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
        <Link
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="/about"
          rel="noopener noreferrer"
        >
          About
        </Link>
        <Link
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          href="/"
          rel="noopener noreferrer"
        >
          Home
        </Link>
      </div>
    </>
  );
}

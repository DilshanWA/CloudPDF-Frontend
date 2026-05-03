'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Logo/logo.png"
                alt="CloudPDF Logo"
                width={120}
                height={28}
                className="h-7 w-auto"
                priority
              />
            </Link>

            <nav className="ml-20 hidden items-center gap-8 text-sm font-normal text-black lg:flex">
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>

              <Link href="/about" className="transition hover:text-primary">
                Developers
              </Link>

              <Link href="/merge_pdf" className="transition hover:text-primary">
                FeedBack
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <button className="rounded-md bg-transparent px-5 py-2 text-sm font-semibold text-black transition hover:bg-primary-dark">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark">
                Sign up
              </button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
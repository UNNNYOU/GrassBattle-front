'use client';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className="h-20 bg-neutral-800 ">
        <div className="container m-auto">
          <div className="flex justify-between items-center h-20 w-auto">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="トップページのロゴ"
                width="1920"
                height="1080"
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter()
  const isContactPage = router.pathname === '/'

  if (isContactPage) return null

  return (
    <header>
      <div className="h-20 bg-neutral-800 ">
        <div className="container m-auto">
          <div className="flex justify-between items-center h-20 w-auto">
            <Link href="/home">
              <Image
                src="/logo.png"
                alt="トップページのロゴ"
                width="1920"
                height="1080"
                className="h-20 w-auto"
                priority
              />
            </Link>
            <ul>
              <li>
                <Link href="/battle" className="mr-6 text-white text-xl xl:text-2xl font-bold hover:underline hover:text-green-400">
                  Battle
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

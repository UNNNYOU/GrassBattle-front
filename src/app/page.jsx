'use client';
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Top() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      router.push('/home');
    }
  }, []);

  const handleAuth = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  };
  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-screen -z-50">
        <Image
          src="/top-bg.png"
          alt="トップページの背景"
          objectfit="cover"
          fill
        />
      </div>
      <div className="container mx-auto h-screen flex flex-col justify-center itemscenter">
        <div className="w-full lg:w-8/12 mx-auto">
          <Image
            src="/logo.png"
            alt="トップページのロゴ"
            width="1920"
            height="1080"
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={handleAuth}
            className="relative text-center px-16 py-4 overflow-hidden font-bold bg-green-300 border border-gray-100 rounded-sm shadow-inner group"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              GitHubでログイン
            </span>
          </button>
        </div>
      </div>
    </main>
  );}

'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/sheard/loader';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMounted = useRef(true);

  const fetchCurrentUser = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/home`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (response.status === 500) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${refresh_token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/home`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${data.access_token}`
            }
          });
        } else {
          router.push('/');
          throw new Error('トークンのリフレッシュに失敗しました');
        }
      }

      if (isMounted.current) {
        const userData = await response.json();
        setCurrentUser(userData);
        setLoading(false);
      }
    } catch (error) {
      if (isMounted.current) {
        router.push('/');
        console.error('リクエストエラー:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchCurrentUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-center pt-20">
        <div className="container pb-5 lg:border-b-4 border-green-500 px-4 lg:px-20 flex flex-wrap">
          <div className="flex flex-wrap justify-center lg:ml-20 w-full">
            <div className="w-full lg:w-auto lg:mr-5 lg:ml-5 pb-2 flex flex-col items-center justify-center lg:flex-none border-b-4 lg:border-none border-green-500">
              <Image
                src="/coming_soon.png"
                alt="アイコン"
                width="200"
                height="200"
                priority
              />
              <p className="mt-4 text-2xl font-bold">{currentUser.name}</p>
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex justify-center mt-5 font-bold text-3xl">
                <ul className="flex items-end">
                  <li className="mt-2">{currentUser.user_status.level}Lv</li>
                  <li className="mt-2 text-sm ml-3 mb-1">次のレベルまで<span className="text-green-500">■</span>×{10 - currentUser.user_status.experience_points}</li>
                </ul>
              </div>
              <div className="mt-10 font-bold flex flex-col text-center">
                <a href="#" className="text-2xl">本日の戦闘力<span className="text-3xl">{currentUser.user_status.week_contributions}</span>万</a>
                <p className="mt-10 text-sm">多分これからステータスとかが色々入るぞ？</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

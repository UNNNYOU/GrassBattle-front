'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/sheard/loader';

export default function Mypage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const router = useRouter();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/mypage`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(res => {
        if (res.status === 500) {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${refresh_token}`,
            },
          })
            .then(res => {
              if (res.status === 200) {
                return res.json();
              } else {
                throw new Error('トークンのリフレッシュに失敗しました');
              }
            })
            .then(response => {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('refresh_token', response.refresh_token);
              return response.access_token;
            })
            .catch(error => {
              console.error('リクエストエラー:', error);
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              router.push('/');
            });
        } else {
          return res.json();
        }
      })
      .then(res => {
        setCurrentUser(res.current_user);
        setUserStatus(res.user_status);
        setLoading(false); // 非同期処理が終わったらローディングを終了
        console.log(res);
      })
      .catch(error => {
        console.error('リクエストエラー:', error);
        router.push('/');
      });
  }, []); // 依存配列には空の配列を入れて、初回レンダリング時のみ実行

  if (loading) {
    return <div><Loader /></div>; // ローディング中の表示
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
              />
              <p className="mt-4 text-2xl font-bold">{currentUser.name}</p>
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex justify-center mt-5 font-bold text-3xl">
                <ul className="flex items-end">
                  <li className="mt-2">{userStatus.level}Lv</li>
                  <li className="mt-2 text-sm ml-3 mb-1">次のレベルまで<span className="text-green-500">■</span>×{10 - userStatus.experience_points}</li>
                </ul>
              </div>
              <div className="mt-10 font-bold flex flex-col text-center">
                <a href="#" className="text-2xl">本日の戦闘力<span className="text-3xl">{userStatus.week_contributions}</span>万</a>
                <p className="mt-10 text-sm">多分これからステータスとかが色々入るぞ？</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

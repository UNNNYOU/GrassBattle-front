'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/sheard/loader';

export default function Battle() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const router = useRouter();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/battles`, {
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
        setUsers(res);
        console.log(res);
        setLoading(false); // 非同期処理が終わったらローディングを終了
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
    <div className="min-h-screen bg-white">
    </div>
  );
}

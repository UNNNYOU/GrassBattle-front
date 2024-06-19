'use client';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/sheard/loader';
import { useRouter } from 'next/navigation';

export default function TokenPage() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    // URLSearchParamsオブジェクトを作成してクエリ文字列を解析
    const params = new URLSearchParams(queryString);
    // 特定のパラメータの値を取得
    const token = params.get('token');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      router.push('/home');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []); // 空の依存配列で一度だけ実行

  return (
    <div>
      <Loader />
    </div>
  );
}

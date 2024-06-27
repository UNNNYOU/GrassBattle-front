'use client';
import { Suspense, useEffect } from 'react';
import { Loader } from '@/components/sheard/loader';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

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
    <Suspense>
      <div className="bg-white">
        <Loader />
      </div>
    </Suspense>
  );
}

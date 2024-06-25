'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/sheard/loader';
import { Pagination } from '@/components/sheard/pagination';

export default function Battle(){
  const [users, setUsers] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const [paged, setPaged] = useState(1);
  const router = useRouter();

  const fetchUsers = () => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/battles/?page=${paged}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => {
      if (res.status === 500) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
          method: 'GET',
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
          });
      } else {
        return res.json();
      }
    })
    .then(res => {
      setUsers(res.users);
      setPagination(res.pagination);
      setLoading(false); // 非同期処理が終わったらローディングを終了
    })
    .catch(error => {
      console.error('リクエストエラー:', error);
      router.push('/');
    });
  } 

  useEffect(() => {
    fetchUsers();
  }, [paged]);

  if (loading) {
    return <div className="bg-white"><Loader /></div>; // ローディング中の表示
  }

  return (
    <div className="bg-white">
      <div className="container m-auto min-h-screen">
        <div className="text-center text-4xl pt-10">
          <p>GRASS BATTLE MEMBERS</p>
        </div>
        <div className="flex flex-wrap justify-center my-10 pb-10">
          {users.map((user) =>(
          <div key={user.id} className="relative flex mx-4 mt-4 w-72 flex-col rounded-xl bg-white text-gray-700 shadow-2xl drop-shadow-xl">
            <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl bg-white text-gray-700 shadow-xl">
              <Image
                src="/UserImage.png"
                alt="ユーザー画像"
                objectfit="cover"
                width="1920"
                height="1080"
                priority
              />
            </div>
            <p className="text-center mt-2 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {user.name}
            </p>
            <a href='#' className="relative text-center px-5 py-3 overflow-hidden font-bold text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group" >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">BATTLE START</span>
            </a>
          </div>
          ))}
        </div>
        <Pagination pagination={pagination} setPaged={setPaged} />
      </div>
    </div>
  )
}

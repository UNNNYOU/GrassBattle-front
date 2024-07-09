'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader } from '@/components/shared/Loader';
import { Pagination } from '@/components/shared/Pagination';
import { BattleResult } from '@/components/battle/BattleResult'

export default function Home() {
  const [users, setUsers] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [battleUser, setBattleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paged, setPaged] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMounted = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchUsers = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/battles/?page=${paged}`, {
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
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/battles/?page=${paged}`, {
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
        const res = await response.json();
        setUsers(res.users);
        setPagination(res.pagination);
        setCurrentUser(res.current_user);
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
    fetchUsers();

    return () => {
      isMounted.current = false;
    };
  }, [paged]);

  useEffect(() => {
    // URLのqueryパラメータからpagedの値を取得してセットする
    const page = parseInt(searchParams.get('page'), 10) || 1;
    setPaged(page);
  }, [searchParams.get('page')]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) return <Loader />


  return (
  <div className="bg-white">
    <div className="container m-auto min-h-screen">
      <div className="text-center text-4xl pt-10">
        <p>GRASS BATTLE MEMBERS</p>
      </div>
      <div className="flex flex-wrap justify-center my-10 pb-10">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center mx-4 mt-4 w-72 rounded-xl bg-white text-gray-700 shadow-2xl drop-shadow-xl">
            <div className="mx-4 mt-4 w-4/5 h-44 overflow-hidden rounded-xl bg-white text-gray-700 shadow-2xl flex items-center justify-center">
              <Image
                src={`/avatar${user.avatar_id}.png`}
                alt="ユーザー画像"
                width="150"
                height="150"
                priority
                style={{ objectFit: 'contain' }} // 画像の背景の部分はそのまま
              />
            </div>
            <p className="text-center mt-2 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {user.name}
            </p>
            <button
              onClick={() => {
                toggleModal();
                setBattleUser(user);
              }}
              className="w-full relative text-center px-5 py-3 overflow-hidden font-bold text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">BATTLE START</span>
            </button>
          </div>
        ))}
      </div>
      <div>
        {isModalOpen && (
          <BattleResult currentUser={currentUser} toggleModal={toggleModal} battleUser={battleUser} />
        )}
      </div>
      <Pagination pagination={pagination} setPaged={setPaged} />
    </div>
  </div>
);
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/shared/Loader';
import { UserProfile } from '@/components/home/UserProfile';
import { UserStatus } from '@/components/home/UserStatus';
import { UserExperience } from '@/components/home/UserExperience';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [experienceLogs, setExperienceLogs] = useState([]);
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
        setCurrentUser(userData.current_user);
        setExperienceLogs(userData.experience_logs)
        console.log(userData);
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
        <div className="container pb-10 lg:border-b-4 border-green-500 px-4 lg:px-20 flex flex-wrap">
          <div className="flex flex-wrap justify-center lg:ml-20 w-full">
            <UserProfile currentUser={currentUser} /> 
            <UserStatus currentUser={currentUser} />
            <UserExperience experienceLogs={experienceLogs}/>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader } from '@/components/shared/Loader';
import { UserProfile } from '@/components/home/UserProfile';
import { UserStatus } from '@/components/home/UserStatus';
import { UserExperience } from '@/components/home/UserExperience'
import { CombatPowerGraph } from '@/components/home/CombatPowerGraph';

export default function UserShow() {
  const [user, setUser] = useState(null);
  const [experienceHistories, setExperienceHistories] = useState([]);
  const [weekContributionHistories, setWeekContributionHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const isMounted = useRef(true);

  const fetchUser = async () => {
    try {
      const id = params.id;
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
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
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
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
        setUser(userData.user);
        setExperienceHistories(userData.experience_histories)
        setWeekContributionHistories(userData.week_contribution_histories)
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
    fetchUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <div className="mb-6 lg:mb-10 pb-2 container lg:border-b-4 border-green-500 px-4 lg:px-20 flex flex-wrap">
          <div className="flex flex-wrap justify-center xl:ml-20 w-full">
            <UserProfile user={user} /> 
            <UserStatus user={user} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <CombatPowerGraph weekContributionHistories={weekContributionHistories}/>
          <UserExperience experienceHistories={experienceHistories}/>
        </div>
      </div>
    </div>
  )
}

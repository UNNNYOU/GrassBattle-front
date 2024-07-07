'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/shared/Loader';
import { UserStatus } from '@/components/home/UserStatus';
import { UserExperience } from '@/components/home/UserExperience'
import { CombatPowerGraph } from '@/components/home/CombatPowerGraph';
import { BiEdit } from "rocketicons/bi";
import Image from 'next/image';
import { RenameModal } from '@/components/home/RenameModal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [experienceHistories, setExperienceHistories] = useState([]);
  const [weekContributionHistories, setWeekContributionHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMounted = useRef(true);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

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
        setExperienceHistories(userData.experience_histories);
        setWeekContributionHistories(userData.week_contribution_histories);
        setUserName(userData.current_user.name);
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

  const toggleRenameModal = () => {
    setRenameModalOpen(!renameModalOpen);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <div className="mb-6 lg:mb-10 pb-2 container lg:border-b-4 border-green-500 px-4 lg:px-20 flex flex-wrap">
          <div className="flex flex-wrap justify-center xl:ml-20 w-full">
            <div className="w-full lg:w-auto lg:mr-5 pb-2 flex flex-col items-center justify-center lg:flex-none border-b-4 lg:border-none border-green-500">
              <Image
                src="/coming_soon.png"
                alt="アイコン"
                width="200"
                height="200"
                priority
              />
              <p className="mt-4 text-2xl font-bold">{userName}
                <span onClick={() => {toggleRenameModal();}}><BiEdit className="mb-1 icon-xl icon-gray-700"/></span>
              </p>
            </div>
            <UserStatus user={currentUser} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <CombatPowerGraph weekContributionHistories={weekContributionHistories}/>
          <UserExperience experienceHistories={experienceHistories}/>
        </div>
      </div>
      <div>
        {renameModalOpen && (
          <RenameModal toggleRenameModal={toggleRenameModal} currentUser={currentUser} userName={userName} setUserName={setUserName}/>
        )}
      </div>
    </div>
  )
}


import { RxCross2 } from "rocketicons/rx";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Loader } from "../shared/Loader";

export function AvatarModal(props) {
  const router = useRouter();
  const avatarArray = Array.from({ length: props.avatarCount }, (_, i) => i + 1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, avatarId) => {
    e.preventDefault();
    setLoading(true);

    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${props.currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { avatar_id: avatarId } }),
    });

    if (response.status === 401 || response.status === 403) {
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

        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${props.currentUser.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: { avatar_id: avatarId } }),
        });
      } else {
        router.push('/');
        throw new Error('トークンのリフレッシュに失敗しました');
      }
    }

    setLoading(false);
    if (response.status === 200) {
      props.toggleAvatarModal();
    } else {
      alert('アバターの変更に失敗しました');
      router.push('/')
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85">
      <div className="relative w-11/12 h-5/6 p-6 lg:p-20 bg-white overflow-hidden">
        <div className="absolute top-2 right-2 cursor-pointer" onClick={props.toggleAvatarModal}>
          <RxCross2 className="icon-2xl icon-gray-700 hover:icon-green-400" />
        </div>
        <h1 className="text-center font-bold text-2xl">アバターの変更</h1>
        <div className="flex flex-wrap justify-center mt-5 h-full overflow-y-auto">
          {avatarArray.map((avatarId) => (
            <div key={avatarId} className="flex flex-col justify-center items-center m-2 lg:m-4 w-1/3 md:w-1/4 lg:w-1/6">
              <Image
                src={`/avatar${avatarId}.png`}
                alt="アイコン"
                width={200}
                height={200}
                priority
                style={{ objectFit: 'contain' }}
                className={`border-4 ${props.currentUserAvatarId === avatarId ? 'border-red-500' : 'border-gray-700 hover:border-green-500'} cursor-pointer`}
                onClick={(e) => {
                  handleSubmit(e, avatarId)
                  props.setCurrentUserAvatarId(avatarId)
                }}
              />
            </div>
          ))}
        </div>
        {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"><Loader/></div>}
      </div>
    </div>
  );
}


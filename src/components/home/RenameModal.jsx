import { useState } from 'react';
import { RxCross2 } from "rocketicons/rx";
import { useRouter } from 'next/navigation';

export function RenameModal(props) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${props.currentUser.id}`, {
      method: 'PATCH', // PATCHに変更
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { name: props.userName } // パラメータの構造を変更
      }),
    });

    if (response.status === 401 || response.status === 403) { // 401 Unauthorized, 403 Forbidden
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
          method: 'PATCH', // PATCHに変更
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: { name: props.userName } // パラメータの構造を変更
          }),
        });
      } else {
        router.push('/');
        throw new Error('トークンのリフレッシュに失敗しました');
      }
    }
    if (response.status === 200) {
      props.toggleRenameModal();
    } else {
      alert('名前の変更に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
      <div className="relative w-11/12 h-4/5 px-2 py-10 lg:p-20 bg-white">
        <div className="absolute top-2 right-2" onClick={props.toggleRenameModal}>
          <RxCross2 className="icon-2xl icon-gray-700" />
        </div>
        <h1 className="text-center mt-5 font-bold text-xl">名前の変更</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-full text-center">
          <input
            className="w-11/12 lg:w-1/2 p-5 mb-20 text-center text-xl font-bold border-2 border-gray-400 focus:outline-green-400"
            id={props.currentUser.id}
            name={props.currentUser.name}
            type="text"
            value={props.userName}
            onChange={(e) => props.setUserName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-400 text-white w-11/12 lg:w-1/4 p-4 text-xl font-bold">
            変更する
          </button>
        </form>
      </div>
    </div>
  );
}

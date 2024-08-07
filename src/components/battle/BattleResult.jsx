import Link from 'next/link';
import Image from 'next/image';
import { RxCross2 } from "rocketicons/rx";

export function BattleResult(props) {
  const BattleResult = () => {
    if (props.currentUser.user_status.week_contributions > props.battleUser.user_status.week_contributions) {
      return 'YOUR WIN';
    } else if (props.currentUser.user_status.week_contributions < props.battleUser.user_status.week_contributions) {
      return 'YOUR LOSE';
    } else {
      return 'Draw';
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
      <div className="relative w-11/12 lg:w-5/6 h-5/6 px-2 py-10 lg:p-20 bg-white overflow-y-scroll">
        <div className="absolute top-2 right-2" onClick={props.toggleModal}>
          <RxCross2 className="icon-2xl icon-gray-700" />
        </div>
        <p className="text-center text-bold text-4xl lg:text-6xl">{BattleResult()}</p>
        <div className="flex flex-wrap justify-around items-center mt-10">
          {/* Current User */}
          <div className="relative flex flex-col items-center mx-4 mt-4 w-60 md:w-80 lg:w-96 flex-shrink-0 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="mx-4 mt-4 w-4/5 h-44 overflow-hidden rounded-xl bg-white text-gray-700 shadow-2xl flex items-center justify-center">
              <Image
                src={`/avatar${props.currentUser.avatar_id}.png`}
                alt="ユーザー画像"
                width="150"
                height="150"
                priority
                style={{ objectFit: 'contain' }}
                className="lg:transform lg:scale-x-[-1] lg:scale-y-1"
              />
            </div>
            <p className="text-center mt-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {props.currentUser.name}
            </p>
            <div className="text-center mt-2 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              <p>Lv.{props.currentUser.user_status.level}</p>
              <p className="ml-3 mt-1">戦闘力 {props.currentUser.user_status.week_contributions === 0 ? 0 : `${props.currentUser.user_status.week_contributions}万`}</p>
            </div>
          </div>
          {/* Battle User */}
          <div className="relative flex flex-col items-center mx-4 mt-4 w-60 md:w-80 lg:w-96 flex-shrink-0 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="mx-4 mt-4 w-4/5 h-44 overflow-hidden rounded-xl bg-white text-gray-700 shadow-2xl flex items-center justify-center">
              <Image
                src={`/avatar${props.battleUser.avatar_id}.png`}
                alt="ユーザー画像"
                width="150"
                height="150"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-center mt-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {props.battleUser.name}
            </p>
            <div className="text-center mt-2 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              <p>Lv.{props.battleUser.user_status.level}</p>
              <p className="ml-3 mt-1">戦闘力 {props.battleUser.user_status.week_contributions === 0 ? 0 : `${props.battleUser.user_status.week_contributions}万`}</p>
            </div>
          </div>
        </div>
        <Link href={`/users/${props.battleUser.id}`} passHref className="text-white flex justify-center text-center w-4/6 xl:w-[30rem] mt-16 m-auto transform rounded-sm bg-green-600 py-4 font-bold duration-300 hover:bg-green-400">
            相手のプロフィールを見る
        </Link>
      </div>
    </div>
  );
}

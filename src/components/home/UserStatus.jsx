export function UserStatus(props) {
  return (
    <div className="flex flex-col w-full lg:w-2/4 lg:pl-6">
      <div className="flex justify-center mt-5 font-bold text-3xl">
        <ul className="flex items-end">
          <li className="mt-2">{props.currentUser.user_status.level}Lv</li>
          <li className="mt-2 text-sm ml-3 mb-1">次のレベルまで<span className="text-green-500">■</span>×{10 - props.currentUser.user_status.experience_points}</li>
        </ul>
      </div>
      <div className="mt-10 font-bold flex flex-col text-center">
        <p className="text-2xl">本日の戦闘力<span className="text-3xl">{props.currentUser.user_status.week_contributions}</span>万</p>
        <p className="mt-10 mb-10 text-sm">これからステータスとかが入るぞ</p>
      </div>
    </div>
  );
}

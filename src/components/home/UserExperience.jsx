export function UserExperience(props) {
  const getFormattedDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('ja-JP', { year: undefined, month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full h-60 lg:w-[350px] lg:ml-5 flex flex-col items-center pt-5 text-gray-700 font-bold text-lg">
      <h1 className="mb-4">経験値取得履歴</h1>
      <div className="overflow-y-scroll w-3/4 px-2 ml-1 pl-16 border-4 border-gray-400 rounded-md">
        {props.experienceLogs.map((exp) => {
          return (
            <div key={exp.id}>
              <h1 className="mt-1">
                <span>{getFormattedDate(exp.created_at)}</span> <span className="text-green-500">■</span>×<span>{exp.earned_experience_points}</span>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

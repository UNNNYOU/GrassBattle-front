export function UserExperience(props) {
  const getFormattedDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('ja-JP', { year: undefined, month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full xl:w-[300px] xl:ml-20 flex flex-col items-center text-gray-700 font-bold text-lg">
      <h1 className="mb-5">経験値取得履歴</h1>
      <div className="overflow-y-scroll text-center h-60 lg:h-[46vh] w-3/4 xl:w-full px-2 ml-1 border-4 border-gray-400 rounded-md">
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

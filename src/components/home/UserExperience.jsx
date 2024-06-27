export function UserExperience(props) {
  const getFormattedDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  return (
    <div className="w-full h-60 lg:w-1/3 flex flex-col items-center pt-5 text-gray-700 font-bold text-lg">
      <h1 className="mb-4">経験値取得履歴</h1>
      <div className="overflow-y-scroll w-full px-2 ml-2 flex flex-col items-center">
        {props.experienceLogs.map((exp) => {
          return (
            <div key={exp.id}>
              <h1 className="mt-1">
                <span>{getFormattedDate(exp.created_at)}</span> 経験値 <span>{exp.earned_experience_points}</span>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

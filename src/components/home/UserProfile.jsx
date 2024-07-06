import Image from "next/image";

export function UserProfile(props) {
  return (
    <div className="w-full lg:w-auto lg:mr-5 pb-2 flex flex-col items-center justify-center lg:flex-none border-b-4 lg:border-none border-green-500">
      <Image
        src="/coming_soon.png"
        alt="アイコン"
        width="200"
        height="200"
        priority
      />
      <p className="mt-4 text-2xl font-bold">{props.user.name}</p>
    </div>
  );
}

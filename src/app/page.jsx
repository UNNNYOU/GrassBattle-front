import Image from "next/image";
import Link from "next/link";

export default function Top() {
  return (
    <main>
      <div className="fixed h-screen w-screen -z-50">
        <Image
          src="/top-bg.png"
          alt="トップページの背景"
          className="object-cover"
          quality={100}
          sizes="100vw"
          fill
        />
      </div>
      <div className="container m-auto pt-10">
        <div className="w-8/12 m-auto">
          <Image
            src="/logo.png"
            alt="トップページのロゴ"
            width="1920"
            height="1080"
          />
        </div>
        <div className="text-gray-700">
          <div className="flex flex-col text-center justify-center">
            <div className="flex justify-center items-center"></div>
            <div className="mt-16">
              <Link
                href="/about"
                className="relative text-center px-24 py-4 overflow-hidden font-bold text-gray-600 bg-green-300 border border-gray-100 rounded-sm shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  戦いに行く
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

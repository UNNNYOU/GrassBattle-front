import { Hepta_Slab, Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/sheard/Header";
import { Footer } from "@/components/sheard/Footer";
import { Suspense } from "react";
import { Loader } from "@/components/sheard/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GRASS BATTLE",
  description: "GitHub contribuions battle game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-white text-neutral-800">
        <Suspense fallback={<Loader/>}>
          <Header/>
          {children}
          <Footer/>
        </Suspense>
      </body>
    </html>
  );
}

import { Hepta_Slab, Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/sheard/header";
import { Footer } from "@/components/sheard/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GRASS BATTLE",
  description: "GitHub contribuions battle game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-white text-neutral-800">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

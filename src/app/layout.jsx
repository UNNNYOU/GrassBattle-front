import "../styles/globals.css";
import { Suspense } from "react";
import { Loader } from "@/components/shared/Loader";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "GRASS BATTLE",
  description: "GitHub contribuions battle game",
  openGraph: {
    title: "GRASS BATTLE",
    description: "GitHubのコントリビューションで対戦するゲーム",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "GRASS BATTLE",
    images: "https://www.grassbattle.com/OGP.webp",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics gaId={process.env.GA4_ID ?? ""} />
      </head>
      <body className="bg-white text-neutral-800">
        <Suspense fallback={<Loader/>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

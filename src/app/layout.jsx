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
    url: "https://www.grassbattle.com",
    siteName: "GRASS BATTLE",
    images: "https://www.grassbattle.com/OGP.webp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRASS BATTLE",
    description: "GitHubのコントリビューションで対戦するゲーム",
    images: "https://www.grassbattle.com/OGP.webp",
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://li-yuchen.github.io"),
  title: {
    default: "李昱辰｜生成式模型研究",
    template: "%s｜李昱辰",
  },
  description: "李昱辰的生成式人工智能研究作品集，聚焦 Diffusion、Flow Matching、可控生成与 AIGC。",
  openGraph: {
    title: "李昱辰｜生成式模型研究",
    description: "Diffusion · Flow Matching · Controllable Generation",
    images: [
      {
        url: `${basePath}/og.png`,
        width: 1200,
        height: 630,
        alt: "Li Yuchen Generative AI Research",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "李昱辰｜生成式模型研究",
    description: "Diffusion · Flow Matching · Controllable Generation",
    images: [`${basePath}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

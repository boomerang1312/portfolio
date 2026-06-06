import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Grigorii Slicov — Web Developer | Next.js, React, Supabase",
  description: "Опытный веб-разработчик из Молдовы. 5 лет опыта, 10+ проектов. Создаю современные сайты и веб-приложения на Next.js, React и Supabase. Быстро, качественно, под ключ.",
  keywords: ["web developer", "next.js developer", "react", "supabase", "moldova", "веб-разработчик", "Кишинёв", "разработка сайтов"],
  authors: [{ name: "Grigorii Slicov" }],
  metadataBase: new URL("https://portfolio-bay-one-22.vercel.app"),
  openGraph: {
    title: "Grigorii Slicov — Web Developer",
    description: "5 лет опыта, 10+ проектов. Создаю сайты и приложения на Next.js, React, Supabase.",
    url: "https://portfolio-bay-one-22.vercel.app",
    siteName: "Grigorii Slicov Portfolio",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Grigorii Slicov — Web Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grigorii Slicov — Web Developer",
    description: "5 лет опыта, 10+ проектов. Next.js, React, Supabase.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen bg-[#07070f] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}

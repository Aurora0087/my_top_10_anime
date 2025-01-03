import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisScroll from "@/components/LanisScroll";

const netflixSan = localFont({
  src: "./fonts/NetflixSansBold.otf",
  variable: "--font-netflix-san",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Your top 10 Anime list",
  description: "Create Your own top 10 Anime list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <LenisScroll>
        <body
          className={`${netflixSan.className} antialiased w-screen min-h-screen relative overflow-hidden bg-[#fff429]`}
        >
          {children}
        </body>
      </LenisScroll>
    </html>
  );
}

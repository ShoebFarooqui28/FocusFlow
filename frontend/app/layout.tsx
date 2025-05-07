import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"
import Navbar from "@/app/components/sections/navbar"

export const poppins = Poppins({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "FocusFlow",
  description: "A Pomodoro timer built with Next.js",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/40 z-[-1]" />

        <Navbar />
        {children}

      </body>
    </html>
  );
}

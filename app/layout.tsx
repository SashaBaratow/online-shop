import type { Metadata } from "next";
import {Geist, Geist_Mono, Noto_Sans} from "next/font/google";
import "./globals.css";
import {ReactQueryProvider} from "@/app/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-noto-sans",
    display: "swap",
});

export const metadata: Metadata = {
  title: "!o-shop",
  description: "e-commerce",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../utils/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบร้องเรียนคณะบริหารธุรกิจ",
  description:
    "ระบบร้องเรียนคณะบริหารธุรกิจ คณะบริหารธุรกิจ มหาวิทยาลัยเทคโนโลยรราชมงคล ธัญบุรี",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}

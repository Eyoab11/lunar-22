import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lunar 22",
  description: "Where legendary world-builders unite to redefine animation for the next century",
  icons: {
    icon: [
      { url: '/L22 W.png', sizes: '32x32', type: 'image/png' },
      { url: '/L22 W.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/L22 W.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

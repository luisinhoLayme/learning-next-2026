import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/components/ui/navbar'
import "./globals.css";
import { UIProvider } from "@/context/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - Open Jira",
  description: "Open Jira Task Manager",
};

// WARN: your at video 15, at Open Jira

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" data-theme="blossom">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UIProvider>
          <Navbar />
          {children}
        </UIProvider>
      </body>
    </html>
  );
}

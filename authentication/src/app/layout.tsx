import type { Metadata } from "next";
import { Poppins, Irish_Grover, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";

export const irishGrover = Irish_Grover({
  weight: ["400"],
  variable: "--font-irish",
  subsets: ["latin"]
})
export const mochiyPopOne = Mochiy_Pop_One({
  weight: ["400"],
  variable: "--font-mochiy",
  subsets: ["latin"]
})
export const poppins = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "OAuth - App",
  description: "Authentication OAuth",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${irishGrover.variable} ${mochiyPopOne.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

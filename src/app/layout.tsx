import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viso | AI Content Engine",
  description: "Repurpose video content in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 👇 Add this attribute to silence extension errors */}
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
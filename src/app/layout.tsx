import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viso | AI Content Engine",
  description: "Repurpose video content in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap everything here 👇
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
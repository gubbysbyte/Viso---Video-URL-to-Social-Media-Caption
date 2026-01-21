import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Footer from "@/components/Footer";
import Header from "@/components/Header"; // Import the new Header component

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
      <html lang="en" className="bg-neutral-950">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <Header /> {/* Render the Header component */}
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
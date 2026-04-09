import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/src/components/providers";
import "@/src/app/globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Story Log",
  description: "Story Log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav className="flex gap-4">
            <Link href="/">Main</Link>
            <Link href="/create-entry">Create Entry</Link>
            <Link href="/my-entry">My Entry</Link>
            <Link href="/recommendations">Recommendations</Link>
            <Link href="/login">Login</Link>
          </nav>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

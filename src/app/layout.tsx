import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/Components/Shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Suites",
  description: "Created by Felipe de Senco",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} id="easy-suites-root">
        <main className="flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tuokelai Machinery | Chinese Heavy Equipment Export",
  description:
    "Changsha Tuokelai Machinery Equipment Co., Ltd. — Premium second-hand tower cranes and construction machinery exported worldwide.",
  keywords:
    "tower crane, second-hand construction equipment, China machinery export, used tower crane, Zoomlion, XCMG, SANY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

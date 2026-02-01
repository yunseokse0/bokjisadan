import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "복지사단 | 피터패트",
  description: "복지사단(수장 피터패트) 공식 팬페이지. 라이브, 조직도, 게시판, 후원",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.variable} antialiased bg-[#050505] text-foreground min-h-screen flex flex-col`}>
        <Navbar />
        <div className="relative z-10 flex flex-1">
          <main className="min-w-0 flex-1">
            {children}
          </main>
          <Sidebar />
        </div>
        <Footer />
      </body>
    </html>
  );
}

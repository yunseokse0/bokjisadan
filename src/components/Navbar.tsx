"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/sadan", label: "Org" },
  { href: "/live", label: "Live" },
  { href: "/community", label: "Board" },
  { href: "/support", label: "Support" },
];

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "#";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/40 pt-[env(safe-area-inset-top)]"
      role="banner"
    >
      <nav className="mx-auto flex h-14 min-h-[44px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-foreground hover:text-[#ff4d00] transition-colors min-h-[44px] items-center"
        >
          <span className="text-lg">복지사단</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex md:flex-1 md:justify-center items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-underline px-4 py-2 text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive ? "text-[#ff4d00]" : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-[#ff4d00]/20 hover:text-[#ff4d00] transition-colors"
            aria-label="텔레그램"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
            aria-expanded={mobileOpen}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 (풀화면 오버레이) */}
      <div
        className={`md:hidden fixed inset-0 top-14 z-40 bg-black/95 backdrop-blur-lg transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col pt-6 px-4 pb-8" aria-label="모바일 메뉴">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center min-h-[48px] px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  isActive
                    ? "text-[#ff4d00] bg-[#ff4d00]/10"
                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

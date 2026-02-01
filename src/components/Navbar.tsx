"use client";

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

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/40"
      role="banner"
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-foreground hover:text-[#ff4d00] transition-colors"
        >
          <span className="text-lg">복지사단</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-underline px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#ff4d00]" : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-[#ff4d00]/20 hover:text-[#ff4d00] transition-colors"
            aria-label="텔레그램"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

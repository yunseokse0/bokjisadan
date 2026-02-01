import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/sadan", label: "소개" },
  { href: "/live", label: "라이브" },
  { href: "/community", label: "게시판" },
  { href: "/support", label: "후원" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">복지사단</p>
            <p className="mt-1 text-sm text-zinc-500">수장 · 피터패트</p>
          </div>
          <nav className="flex flex-wrap gap-6" aria-label="푸터 메뉴">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/5 pt-8">
          <p className="text-xs text-zinc-500 leading-relaxed">
            본 페이지는 팬 운영 팬페이지이며, 공식 사단과 무관할 수 있습니다. 방송·후원·게스트 예약 등은 각 플랫폼 및 사단 정책을 따릅니다.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            © 복지사단 팬페이지 · 피터패트
          </p>
        </div>
      </div>
    </footer>
  );
}

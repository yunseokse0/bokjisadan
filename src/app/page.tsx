import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="relative z-10">
      <HeroSection />

      {/* 헤드라인 + 라이브 요약 */}
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href="/live"
            className="section-card group block overflow-hidden rounded-xl p-6 transition-all"
          >
            <h2 className="section-title text-xl md:text-2xl">실시간 라이브</h2>
            <p className="mt-2 text-sm text-zinc-400">
              피터패트님의 현재 방송을 한곳에서 확인하세요.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
              라이브 센터 →
            </span>
          </Link>
          <Link
            href="/sadan"
            className="section-card group block overflow-hidden rounded-xl p-6 transition-all"
          >
            <h2 className="section-title text-xl md:text-2xl">복지사단 소개</h2>
            <p className="mt-2 text-sm text-zinc-400">
              수장 피터패트와 조직도를 확인하세요.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
              조직도 보기 →
            </span>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/community"
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            게시판
          </Link>
          <Link
            href="/support"
            className="rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            후원 & 명예의 전당
          </Link>
        </div>
      </section>
    </div>
  );
}

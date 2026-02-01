import OrgChart from "@/components/OrgChart";
import LiveGrid from "@/components/LiveGrid";
import Schedule from "@/components/Schedule";
import Donation from "@/components/Donation";
import ReserveForm from "@/components/ReserveForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 히어로: 복지사단 + 피터패트 */}
      <header className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-zinc-900/95"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-400 tracking-tight">
            복지사단
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            수장 · 피터패트
          </p>
          <p className="mt-4 text-sm text-zinc-500 max-w-xl mx-auto">
            유튜브 피터패트님과 크루의 팬페이지입니다. 실시간 방송, 편성표, 후원, 게스트 예약을 한곳에서.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <LiveGrid />
        <OrgChart />
        <Schedule />
        <Donation />
        <ReserveForm />
      </main>

      <footer className="py-8 px-4 text-center text-zinc-500 text-sm border-t border-zinc-800">
        © 복지사단 팬페이지 · 피터패트
      </footer>
    </div>
  );
}

import LiveGrid from "@/components/LiveGrid";

export const metadata = {
  title: "라이브 센터 | 복지사단",
  description: "복지사단 실시간 방송",
};

export default function LivePage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="section-title text-3xl md:text-4xl">라이브 센터</h1>
        <p className="mt-3 text-zinc-400 text-sm">
          현재 방송 중인 사단 멤버를 확인하세요.
        </p>
      </header>
      <LiveGrid />
    </div>
  );
}

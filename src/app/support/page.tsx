import Donation from "@/components/Donation";
import ReserveForm from "@/components/ReserveForm";

export const metadata = {
  title: "후원 | 복지사단",
  description: "후원 안내, 명예의 전당, 게스트 예약",
};

export default function SupportPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="section-title text-3xl md:text-4xl">후원 & 지원</h1>
        <p className="mt-3 text-zinc-400 text-sm">
          후원 안내, 명예의 전당, 게스트 예약을 한곳에서.
        </p>
      </header>
      <Donation />
      <ReserveForm />
    </div>
  );
}

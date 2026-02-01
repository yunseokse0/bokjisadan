import OrgChart from "@/components/OrgChart";

export const metadata = {
  title: "소개 | 복지사단",
  description: "복지사단 역사, 수장 피터패트 소개, 조직도",
};

export default function SadanPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="section-title text-3xl md:text-4xl">복지사단 소개</h1>
        <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-sm leading-relaxed">
          수장 피터패트와 함께하는 복지사단의 역사와 조직도를 확인하세요.
        </p>
      </header>
      <OrgChart />
    </div>
  );
}

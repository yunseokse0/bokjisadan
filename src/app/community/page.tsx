import BoardSection from "@/components/BoardSection";

export const metadata = {
  title: "게시판 | 복지사단",
  description: "팬 게시판, 인기글, 공지",
};

export default function CommunityPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="section-title text-3xl md:text-4xl">커뮤니티</h1>
        <p className="mt-3 text-zinc-400 text-sm">
          팬 게시판, 갤러리, 정기 공지를 확인하세요.
        </p>
      </header>
      <BoardSection />
    </div>
  );
}

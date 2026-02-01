"use client";

const POPULAR_POSTS = [
  { id: 1, title: "복지사단 1월 정기 공지", category: "공지", views: 1234, date: "2025.01.15" },
  { id: 2, title: "피터패트님 야킹 하이라이트 모음", category: "일반", views: 892, date: "2025.01.14" },
  { id: 3, title: "게스트 신청 방법 안내", category: "안내", views: 567, date: "2025.01.10" },
];

const RECENT_POSTS = [
  { id: 4, title: "이번 주 방송 편성표", category: "공지", author: "운영진", date: "2025.01.16", comments: 12 },
  { id: 5, title: "후원 감사 인사", category: "일반", author: "팬A", date: "2025.01.15", comments: 5 },
  { id: 6, title: "술먹방 하이라이트", category: "일반", author: "팬B", date: "2025.01.14", comments: 23 },
  { id: 7, title: "갤러리 사진 올려요", category: "갤러리", author: "팬C", date: "2025.01.13", comments: 8 },
];

export default function BoardSection() {
  return (
    <div className="space-y-10">
      {/* 인기글 */}
      <section className="section-card overflow-hidden rounded-xl p-4 sm:p-6">
        <h2 className="section-title text-lg sm:text-xl md:text-2xl mb-4 flex items-center gap-2">
          <span className="text-zinc-400">🔥</span> 인기글
        </h2>
        <ul className="divide-y divide-white/5">
          {POPULAR_POSTS.map((post) => (
            <li
              key={post.id}
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 py-3 first:pt-0 hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xs font-medium text-zinc-400 bg-white/5 px-2 py-0.5 rounded shrink-0">
                  {post.category}
                </span>
                <span className="flex-1 min-w-0 font-medium text-foreground truncate">
                  {post.title}
                </span>
              </div>
              <div className="flex gap-3 text-xs text-zinc-500 sm:ml-auto">
                <span>{post.views.toLocaleString()} 조회</span>
                <span>{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 게시판 테이블 */}
      <section className="section-card overflow-hidden rounded-xl">
        <h2 className="section-title text-lg sm:text-xl md:text-2xl p-4 sm:p-6 pb-4 flex items-center gap-2">
          최신글
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-500">
                <th className="py-3 px-4 font-medium w-16">분류</th>
                <th className="py-3 px-4 font-medium min-w-[200px]">제목</th>
                <th className="py-3 px-4 font-medium w-24 hidden sm:table-cell">작성자</th>
                <th className="py-3 px-4 font-medium w-20">날짜</th>
                <th className="py-3 px-4 font-medium w-16">댓글</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RECENT_POSTS.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 sm:px-4">
                    <span className="text-xs font-medium text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-medium text-foreground min-w-0 max-w-[180px] sm:max-w-none truncate">{post.title}</td>
                  <td className="py-3 px-3 sm:px-4 text-zinc-400 hidden sm:table-cell">{post.author}</td>
                  <td className="py-3 px-3 sm:px-4 text-zinc-500 whitespace-nowrap">{post.date}</td>
                  <td className="py-3 px-3 sm:px-4 text-zinc-500">{post.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

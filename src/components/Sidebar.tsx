"use client";

import Link from "next/link";
import { YOUTUBE_CHANNEL_VIDEO } from "@/constants/crew";

/** 현재 라이브 중인 사단 멤버 리스트 (실시간 고정) - 선택 표시 */
export default function Sidebar() {
  const liveMembers = [
    { name: "피터패트", url: YOUTUBE_CHANNEL_VIDEO, isLive: true, viewers: "—" },
  ];

  return (
    <aside
      className="hidden xl:block w-56 shrink-0 border-l border-white/5 bg-black/30 backdrop-blur-sm"
      aria-label="라이브 멤버"
    >
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          지금 라이브
        </h3>
        <ul className="space-y-2">
          {liveMembers.map((m) => (
            <li key={m.name}>
              <Link
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm transition-colors hover:border-[#ff4d00]/40 hover:bg-[#ff4d00]/10"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${m.isLive ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`}
                />
                <span className="truncate font-medium text-foreground">{m.name}</span>
                {m.viewers !== "—" && (
                  <span className="ml-auto text-xs text-zinc-500">{m.viewers}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

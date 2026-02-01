"use client";

import { useEffect, useState } from "react";
import { YOUTUBE_CHANNEL_VIDEO, getYoutubeThumbnailUrl } from "@/constants/crew";

interface LiveItem {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl?: string;
  isLive: boolean;
  platform: "youtube" | "soop";
  streamUrl?: string;
  viewerCount?: string;
  videoId?: string;
  startTime?: string; // 방송 시작 시간
  tags?: string[]; // 사용 중인 태그
}

/** 시청자 수 포맷 (1234 → 1.2천, 12345 → 1.2만) */
function formatViewCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, "")}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}천`;
  return n.toLocaleString();
}

function getVideoId(url: string): string | null {
  try {
    if (url.includes("youtube.com")) return new URL(url).searchParams.get("v");
    return url;
  } catch {
    return null;
  }
}

export default function LiveGrid() {
  const [items, setItems] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base: LiveItem[] = [
      {
        id: "1",
        title: "복지사단 야킹 라이브",
        channelName: "피터패트",
        thumbnailUrl: getYoutubeThumbnailUrl(YOUTUBE_CHANNEL_VIDEO),
        isLive: true,
        platform: "youtube",
        streamUrl: YOUTUBE_CHANNEL_VIDEO,
        videoId: getVideoId(YOUTUBE_CHANNEL_VIDEO) ?? undefined,
        startTime: "20:00",
        tags: ["야킹", "라이브", "복지사단"],
      },
    ];
    setItems(base);
    setLoading(false);
  }, []);

  // 대표 영상 시청자 수 API 조회 (라이브 시 실시간 시청자, 아니면 총 조회수)
  useEffect(() => {
    const videoId = getVideoId(YOUTUBE_CHANNEL_VIDEO);
    if (!videoId) return;

    const fetchViewerCount = async () => {
      try {
        const res = await fetch(`/api/youtube/video?videoId=${encodeURIComponent(videoId)}`);
        const data = await res.json();
        const count =
          data.concurrentViewers != null
            ? data.concurrentViewers
            : data.viewCount != null
              ? data.viewCount
              : null;
        const isLive = !!data.isLive;

        setItems((prev) =>
          prev.map((item) =>
            item.id === "1" && item.videoId === videoId
              ? {
                  ...item,
                  viewerCount: count != null ? formatViewCount(count) : undefined,
                  isLive,
                  title: data.title ?? item.title,
                }
              : item
          )
        );
      } catch {
        // API 실패 시 기존 표시 유지 (시청자 수만 숨김)
      }
    };

    fetchViewerCount();
    const interval = setInterval(fetchViewerCount, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-14 md:py-20 px-4" id="live">
        <h2 className="section-title text-2xl md:text-3xl text-center mb-10">
          실시간 방송
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="section-card h-48 rounded-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20 px-4" id="live">
      <h2 className="section-title text-2xl md:text-3xl text-center mb-10">
        실시간 방송
      </h2>
      <div className="max-w-2xl mx-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group block rounded-2xl overflow-hidden transition-all duration-300
              border backdrop-blur-sm
              hover:scale-[1.02] hover:shadow-xl
              ${item.isLive
                ? "section-card border-[#ff4d00]/40 shadow-lg shadow-[#ff4d00]/25"
                : "section-card border-zinc-700/80"
              }
            `}
          >
            <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500">
                  <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm">썸네일 없음</span>
                </div>
              )}
              {item.isLive && (
                <>
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600/95 text-white text-xs font-bold shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                  {item.viewerCount != null && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 text-white/95 text-xs backdrop-blur-sm">
                      👁 {item.viewerCount}
                    </span>
                  )}
                </>
              )}
              {!item.isLive && item.viewerCount != null && (
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 text-white/95 text-xs backdrop-blur-sm">
                  👁 {item.viewerCount} 조회
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="font-semibold text-foreground truncate group-hover:text-[#ff4d00] transition-colors">
                {item.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                <span>{item.channelName}</span>
                {item.startTime && (
                  <span className="text-zinc-600">· {item.startTime} 시작</span>
                )}
              </div>
              {item.tags && item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}


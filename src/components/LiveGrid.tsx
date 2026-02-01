"use client";

import { useEffect, useState } from "react";
import { YOUTUBE_CHANNEL_VIDEO, YOUTUBE_CHANNEL_ID, getYoutubeThumbnailUrl } from "@/constants/crew";

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
  const [thumbnailFailedIds, setThumbnailFailedIds] = useState<Set<string>>(new Set());

  const fallbackVideoId = getVideoId(YOUTUBE_CHANNEL_VIDEO);

  // 1) 채널 현재 라이브 ID 조회 → 표시할 영상 ID 결정
  useEffect(() => {
    if (!fallbackVideoId) {
      setItems([
        {
          id: "1",
          title: "복지사단 야킹 라이브",
          channelName: "피터패트",
          platform: "youtube",
          streamUrl: YOUTUBE_CHANNEL_VIDEO,
          isLive: false,
        },
      ]);
      setLoading(false);
      return;
    }
    const base: LiveItem[] = [
      {
        id: "1",
        title: "복지사단 야킹 라이브",
        channelName: "피터패트",
        thumbnailUrl: getYoutubeThumbnailUrl(YOUTUBE_CHANNEL_VIDEO),
        isLive: false,
        platform: "youtube",
        streamUrl: YOUTUBE_CHANNEL_VIDEO,
        videoId: fallbackVideoId,
        startTime: "20:00",
        tags: ["야킹", "라이브", "복지사단"],
      },
    ];
    setItems(base);
    setLoading(false);

    const fetchLive = async () => {
      try {
        const params = new URLSearchParams({ videoId: fallbackVideoId });
        if (YOUTUBE_CHANNEL_ID) params.set("channelId", YOUTUBE_CHANNEL_ID);
        const res = await fetch(`/api/youtube/channel-live?${params}`);
        const data = await res.json();
        const displayId = data.liveVideoId ?? data.fallbackVideoId ?? fallbackVideoId;
        const isLive = !!data.liveVideoId;
        const streamUrl = `https://www.youtube.com/watch?v=${displayId}`;

        setItems((prev) =>
          prev.map((item) =>
            item.id === "1"
              ? {
                  ...item,
                  videoId: displayId,
                  streamUrl,
                  thumbnailUrl: getYoutubeThumbnailUrl(streamUrl),
                  isLive,
                }
              : item
          )
        );
      } catch {
        // 유지
      }
    };
    fetchLive();
    const t = setInterval(fetchLive, 30000);
    return () => clearInterval(t);
  }, [fallbackVideoId]);

  // 2) 표시 중인 영상 시청자 수·제목 조회
  useEffect(() => {
    const videoId = items[0]?.videoId ?? fallbackVideoId;
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

        setItems((prev) => {
          if (prev.length === 0) return prev;
          return prev.map((item) =>
            item.id === "1"
              ? {
                  ...item,
                  viewerCount: count != null ? formatViewCount(count) : undefined,
                  isLive: item.isLive ?? !!data.isLive,
                  title: data.title ?? item.title,
                }
              : item
          );
        });
      } catch {
        // 유지
      }
    };

    fetchViewerCount();
    const interval = setInterval(fetchViewerCount, 30000);
    return () => clearInterval(interval);
  }, [items[0]?.videoId, fallbackVideoId]);

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
                ? "section-card border-red-500/30 shadow-lg shadow-red-500/10"
                : "section-card"
              }
            `}
          >
            <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
              {item.thumbnailUrl && item.videoId && !thumbnailFailedIds.has(item.videoId) ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() =>
                    item.videoId &&
                    setThumbnailFailedIds((prev) => new Set(prev).add(item.videoId!))
                  }
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
              <p className="font-semibold text-foreground truncate group-hover:text-zinc-300 transition-colors">
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


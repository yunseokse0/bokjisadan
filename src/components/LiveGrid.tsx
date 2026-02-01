"use client";

import { useEffect, useState } from "react";

interface LiveItem {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl?: string;
  isLive: boolean;
  platform: "youtube" | "soop";
  streamUrl?: string;
  viewerCount?: string;
}

/**
 * YouTube Data API v3 - liveStreamingDetails 확인
 * SOOP 비공식 API 호출 시 User-Agent 설정 필수
 * 방송 중일 때 카드 테두리 shadow-orange-500/50
 */
export default function LiveGrid() {
  const [items, setItems] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 API 연동 시
    // - YouTube: https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=...
    // - SOOP: User-Agent 필수
    const mock: LiveItem[] = [
      {
        id: "1",
        title: "복지사단 야킹 라이브",
        channelName: "피터패트",
        isLive: true,
        platform: "youtube",
        streamUrl: "https://www.youtube.com/@peterpat",
        viewerCount: "1.2k",
      },
      {
        id: "2",
        title: "오늘의 술먹방",
        channelName: "운영진 A",
        isLive: false,
        platform: "youtube",
      },
    ];
    setItems(mock);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4" id="live">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-8">
          실시간 방송
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4" id="live">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-8">
        실시간 방송
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block rounded-xl overflow-hidden border-2 transition-all duration-300
              hover:scale-[1.02]
              ${item.isLive
                ? "border-orange-500 shadow-lg shadow-orange-500/50 bg-zinc-800/80"
                : "border-zinc-600 bg-zinc-800/60"
              }
            `}
          >
            <div className="aspect-video bg-zinc-700 flex items-center justify-center relative">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-zinc-500 text-sm">썸네일 없음</span>
              )}
              {item.isLive && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-bold">
                  LIVE
                </span>
              )}
              {item.viewerCount && item.isLive && (
                <span className="absolute top-2 right-2 text-xs text-white/90">
                  👁 {item.viewerCount}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-foreground truncate">{item.title}</p>
              <p className="text-sm text-zinc-400">{item.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

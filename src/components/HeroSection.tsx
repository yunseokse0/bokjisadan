"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { YOUTUBE_CHANNEL_VIDEO, getYoutubeThumbnailUrl } from "@/constants/crew";

function getVideoId(url: string): string | null {
  try {
    if (url.includes("youtube.com")) return new URL(url).searchParams.get("v");
    return url;
  } catch {
    return null;
  }
}

function formatViewCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, "")}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}천`;
  return n.toLocaleString();
}

export default function HeroSection() {
  const [viewerCount, setViewerCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const videoId = getVideoId(YOUTUBE_CHANNEL_VIDEO);

  useEffect(() => {
    if (!videoId) return;
    const fetchCount = async () => {
      try {
        const res = await fetch(`/api/youtube/video?videoId=${encodeURIComponent(videoId)}`);
        const data = await res.json();
        const count =
          data.concurrentViewers != null
            ? data.concurrentViewers
            : data.viewCount != null
              ? data.viewCount
              : null;
        setViewerCount(count);
        setIsLive(!!data.isLive);
      } catch {
        setViewerCount(null);
      }
    };
    fetchCount();
    const t = setInterval(fetchCount, 60000);
    return () => clearInterval(t);
  }, [videoId]);

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* 배경: 풀와이드 영상 또는 그라데이션 */}
      <div className="absolute inset-0">
        {videoId ? (
          <>
            <img
              src={getYoutubeThumbnailUrl(YOUTUBE_CHANNEL_VIDEO)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #050505 0%, #1a0a00 40%, #0d0500 70%, #050505 100%)",
            }}
          />
        )}
      </div>

      {/* 슬로건 + 시청자 수 */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#ff4d00]/90 mb-4">
          Bokji Sadan
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          <span className="bg-gradient-to-r from-white via-orange-100 to-[#ff4d00] bg-clip-text text-transparent">
            복지는 나눔이다
          </span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          수장 · 피터패트
        </p>
        {viewerCount != null && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
            <span
              className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse bg-red-500" : "bg-zinc-500"}`}
            />
            <span className="text-sm font-medium text-white">
              {isLive ? "라이브" : "조회수"} · {formatViewCount(viewerCount)}
            </span>
          </div>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={YOUTUBE_CHANNEL_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e64500]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            유튜브 보기
          </Link>
          <Link
            href="/live"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            라이브 센터
          </Link>
        </div>
      </div>
    </section>
  );
}

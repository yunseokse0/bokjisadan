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
  const [loading, setLoading] = useState(true);
  const videoId = getVideoId(YOUTUBE_CHANNEL_VIDEO);

  useEffect(() => {
    if (!videoId) {
      setLoading(false);
      return;
    }
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
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
    const t = setInterval(fetchCount, 30000); // 30초마다 라이브 여부 갱신
    return () => clearInterval(t);
  }, [videoId]);

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 */}
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

      {/* 타이틀: 복지사단 (슬로건 제거) */}
      <div className="relative z-10 mx-auto max-w-5xl px-3 sm:px-4 py-8 sm:py-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#ff4d00]/90 mb-3">
          Bokji Sadan
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          <span className="bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent">
            복지사단
          </span>
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          수장 · 피터패트
        </p>
        {!loading && viewerCount != null && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
            <span
              className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse bg-red-500" : "bg-zinc-500"}`}
            />
            <span className="text-sm font-medium text-white">
              {isLive ? "라이브" : "조회수"} · {formatViewCount(viewerCount)}
            </span>
          </div>
        )}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <Link
            href={YOUTUBE_CHANNEL_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4d00] px-5 py-3 min-h-[44px] text-sm font-semibold text-white transition-colors hover:bg-[#e64500] active:scale-[0.98]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            유튜브 보기
          </Link>
          <Link
            href="/live"
            className="rounded-full border border-white/30 bg-white/10 px-5 py-3 min-h-[44px] flex items-center justify-center text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
          >
            라이브 센터
          </Link>
        </div>
      </div>

      {/* 라이브 종료 시: 최근 다시보기 VOD 임베드 */}
      {!loading && !isLive && videoId && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
          <p className="text-center text-sm font-medium text-zinc-400 mb-3">
            최근 다시보기
          </p>
          <div className="rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl aspect-video max-h-[40vh] sm:max-h-[50vh] w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
              title="최근 방송 다시보기"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}

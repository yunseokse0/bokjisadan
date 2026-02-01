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
  const fallbackVideoId = getVideoId(YOUTUBE_CHANNEL_VIDEO);
  const [displayVideoId, setDisplayVideoId] = useState<string | null>(fallbackVideoId);
  const [viewerCount, setViewerCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);

  // 1) 채널 현재 라이브 방송 ID 조회 → 표시할 영상 ID 결정
  useEffect(() => {
    if (!fallbackVideoId) {
      setLoading(false);
      return;
    }
    const fetchLive = async () => {
      try {
        const res = await fetch(
          `/api/youtube/channel-live?videoId=${encodeURIComponent(fallbackVideoId)}`
        );
        const data = await res.json();
        const videoIdToShow = data.liveVideoId ?? data.fallbackVideoId ?? fallbackVideoId;
        setDisplayVideoId(videoIdToShow);
        setIsLive(!!data.liveVideoId);
      } catch {
        setDisplayVideoId(fallbackVideoId);
      } finally {
        setLoading(false);
      }
    };
    fetchLive();
    const t = setInterval(fetchLive, 30000);
    return () => clearInterval(t);
  }, [fallbackVideoId]);

  // 2) 표시 중인 영상의 시청자 수/조회수 조회
  useEffect(() => {
    if (!displayVideoId) return;
    const fetchCount = async () => {
      try {
        const res = await fetch(
          `/api/youtube/video?videoId=${encodeURIComponent(displayVideoId)}`
        );
        const data = await res.json();
        const count =
          data.concurrentViewers != null
            ? data.concurrentViewers
            : data.viewCount != null
              ? data.viewCount
              : null;
        setViewerCount(count);
        if (data.isLive !== undefined) setIsLive(!!data.isLive);
      } catch {
        setViewerCount(null);
      }
    };
    fetchCount();
    const t = setInterval(fetchCount, 30000);
    return () => clearInterval(t);
  }, [displayVideoId]);

  const thumbnailVideoId = displayVideoId ?? fallbackVideoId;
  const embedVideoId = displayVideoId ?? fallbackVideoId;

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      {/* 배경: 썸네일 404 시 그라데이션으로 대체 */}
      <div className="absolute inset-0">
        {thumbnailVideoId && !thumbnailError ? (
          <>
            <img
              src={getYoutubeThumbnailUrl(
                `https://www.youtube.com/watch?v=${thumbnailVideoId}`
              )}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105"
              onError={() => setThumbnailError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
            }}
          />
        )}
      </div>

      {/* 타이틀 */}
      <div className="relative z-10 mx-auto max-w-5xl px-3 sm:px-4 py-8 sm:py-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 mb-3">
          Bokji Sadan
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          복지사단
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          수장 · 피터패트
        </p>
        {!loading && viewerCount != null && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-sm">
            <span
              className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse bg-red-500" : "bg-zinc-500"}`}
            />
            <span className="text-sm font-medium text-zinc-200">
              {isLive ? "라이브" : "조회수"} · {formatViewCount(viewerCount)}
            </span>
          </div>
        )}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <Link
            href={YOUTUBE_CHANNEL_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 min-h-[44px] text-sm font-semibold transition-colors hover:bg-zinc-200 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            유튜브 보기
          </Link>
          <Link
            href="/live"
            className="rounded-full border border-zinc-500/50 bg-white/5 px-5 py-3 min-h-[44px] flex items-center justify-center text-sm font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white active:scale-[0.98]"
          >
            라이브 센터
          </Link>
        </div>
      </div>

      {/* 라이브일 때만 임베드 표시 (비공개 영상으로 인한 오류 방지) */}
      {isLive && embedVideoId && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
          <p className="text-center text-xs font-medium text-zinc-500 mb-3">
            라이브 스트림
          </p>
          <div className="rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl aspect-video max-h-[40vh] sm:max-h-[50vh] w-full">
            <iframe
              src={`https://www.youtube.com/embed/${embedVideoId}?autoplay=0`}
              title="라이브 스트림"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
      {!loading && !isLive && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
          <p className="text-center text-sm text-zinc-500">
            지금은 라이브가 아닙니다. 유튜브 채널에서 확인하세요.
          </p>
        </div>
      )}
    </section>
  );
}

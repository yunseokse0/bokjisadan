import { NextRequest, NextResponse } from "next/server";

/**
 * YouTube Data API v3 - 영상 정보 (실시간 시청자 수, 총 조회수, 라이브 여부)
 * GET /api/youtube/video?videoId=Ea3FhctM0v8
 * 환경변수: YOUTUBE_API_KEY (Google Cloud Console에서 YouTube Data API v3 활성화 후 키 발급)
 */
export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");
  if (!videoId) {
    return NextResponse.json({ error: "videoId 필요" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY 미설정", viewCount: null, concurrentViewers: null, isLive: false },
      { status: 200 }
    );
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "liveStreamingDetails,statistics,snippet");
    url.searchParams.set("id", videoId);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) {
      const err = await res.text();
      console.error("YouTube API error:", res.status, err);
      return NextResponse.json(
        { error: "YouTube API 오류", viewCount: null, concurrentViewers: null, isLive: false },
        { status: 200 }
      );
    }

    const data = await res.json();
    const item = data.items?.[0];
    if (!item) {
      return NextResponse.json({
        viewCount: null,
        concurrentViewers: null,
        isLive: false,
        title: null,
      });
    }

    const statistics = item.statistics ?? {};
    const liveStreamingDetails = item.liveStreamingDetails ?? {};
    const viewCount = statistics.viewCount ? Number(statistics.viewCount) : null;
    const concurrentViewers = liveStreamingDetails.concurrentViewers
      ? Number(liveStreamingDetails.concurrentViewers)
      : null;
    const isLive = !!liveStreamingDetails.concurrentViewers;
    const title = item.snippet?.title ?? null;

    return NextResponse.json({
      viewCount,
      concurrentViewers,
      isLive,
      title,
    });
  } catch (e) {
    console.error("youtube/video API error:", e);
    return NextResponse.json(
      { error: "서버 오류", viewCount: null, concurrentViewers: null, isLive: false },
      { status: 200 }
    );
  }
}

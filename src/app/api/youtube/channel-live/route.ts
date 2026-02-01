import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * 채널의 현재 라이브 방송 영상 ID 조회
 * - YOUTUBE_CHANNEL_ID가 있으면: 해당 채널로 바로 라이브 검색
 * - 없으면: videoId로 채널 ID 조회 후 라이브 검색 (비공개 영상이면 채널 정보 못 가져옴)
 * GET /api/youtube/channel-live?videoId=Ea3FhctM0v8
 */
export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");
  const paramChannelId = request.nextUrl.searchParams.get("channelId")?.trim() || null;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const envChannelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || null;
  const channelIdFromEnvOrParam = envChannelId || paramChannelId;

  if (!apiKey) {
    return NextResponse.json(
      {
        liveVideoId: null,
        fallbackVideoId: videoId ?? null,
        isLive: false,
        message: "YOUTUBE_API_KEY를 Vercel 환경 변수에 설정하면 채널 최신 영상·라이브를 가져옵니다.",
      },
      { status: 200 }
    );
  }

  let channelId: string | null = channelIdFromEnvOrParam;

  // 채널 ID가 없으면 영상으로 채널 ID 조회 (비공개 영상이면 items 비어 있음)
  if (!channelId && videoId) {
    try {
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
        { next: { revalidate: 60 } }
      );
      if (videoRes.ok) {
        const videoData = await videoRes.json();
        channelId = videoData.items?.[0]?.snippet?.channelId ?? null;
      }
    } catch {
      // ignore
    }
  }

  let fallbackVideoId = videoId ?? null;
  if (!channelId) {
    return NextResponse.json({
      liveVideoId: null,
      fallbackVideoId,
      isLive: false,
      message: channelIdFromEnvOrParam ? "채널에서 라이브 없음" : "YOUTUBE_CHANNEL_ID(서버 env 또는 쿼리 channelId)를 설정하면 비공개 영상이어도 채널 라이브를 조회할 수 있습니다.",
    }, { status: 200 });
  }

  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`,
      { next: { revalidate: 30 } }
    );
    if (!searchRes.ok) {
      return NextResponse.json(
        { liveVideoId: null, fallbackVideoId, isLive: false },
        { status: 200 }
      );
    }
    const searchData = await searchRes.json();
    const liveItem = searchData.items?.[0];
    const liveVideoId = liveItem?.id?.videoId ?? null;

    // 라이브 없을 때: 채널 ID가 있으면(env 또는 쿼리) 채널 최신 업로드 1개를 fallback으로 사용 (비공개 영상 404 방지)
    if (!liveVideoId && channelIdFromEnvOrParam) {
      try {
        const latestRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=1&key=${apiKey}`,
          { next: { revalidate: 300 } }
        );
        if (latestRes.ok) {
          const latestData = await latestRes.json();
          const latestId = latestData.items?.[0]?.id?.videoId ?? null;
          if (latestId) fallbackVideoId = latestId;
        }
      } catch {
        // fallbackVideoId는 요청의 videoId 유지
      }
    }

    return NextResponse.json({
      liveVideoId,
      fallbackVideoId,
      isLive: !!liveVideoId,
      channelId,
    });
  } catch (e) {
    console.error("youtube/channel-live error:", e);
    return NextResponse.json(
      { liveVideoId: null, fallbackVideoId, isLive: false },
      { status: 200 }
    );
  }
}

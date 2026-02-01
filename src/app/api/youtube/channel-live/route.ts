import { NextRequest, NextResponse } from "next/server";

/**
 * 채널의 현재 라이브 방송 영상 ID 조회
 * - YOUTUBE_CHANNEL_ID가 있으면: 해당 채널로 바로 라이브 검색
 * - 없으면: videoId로 채널 ID 조회 후 라이브 검색 (비공개 영상이면 채널 정보 못 가져옴)
 * GET /api/youtube/channel-live?videoId=Ea3FhctM0v8
 */
export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");
  const apiKey = process.env.YOUTUBE_API_KEY;
  const envChannelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || null;

  if (!apiKey) {
    return NextResponse.json(
      { liveVideoId: null, fallbackVideoId: videoId ?? null, isLive: false },
      { status: 200 }
    );
  }

  let channelId: string | null = envChannelId;

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

  const fallbackVideoId = videoId ?? null;
  if (!channelId) {
    return NextResponse.json({
      liveVideoId: null,
      fallbackVideoId,
      isLive: false,
      message: envChannelId ? "채널에서 라이브 없음" : "YOUTUBE_CHANNEL_ID를 설정하면 비공개 영상이어도 채널 라이브를 조회할 수 있습니다.",
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

import { NextRequest, NextResponse } from "next/server";
import { isValidVideoId, isValidChannelId } from "@/lib/youtube-validate";

export const dynamic = "force-dynamic";

type StepStatus = "pass" | "fail";

interface ValidationStep {
  step: number;
  name: string;
  status: StepStatus;
  message?: string;
  detail?: string;
}

/**
 * YouTube 라이브/채널 설정 스텝별 검증
 * GET /api/youtube/validate?videoId=DNH6taYZlA4&channelId=UCTjLrH_VkssSD-VC5Qog-VA
 */
export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId")?.trim() || null;
  const channelIdParam = request.nextUrl.searchParams.get("channelId")?.trim() || null;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const envChannelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || null;
  const channelIdAvailable = envChannelId || channelIdParam;

  const steps: ValidationStep[] = [];
  let allPass = true;

  // Step 1: YOUTUBE_API_KEY 설정 여부
  const hasApiKey = !!apiKey && apiKey.length > 0;
  steps.push({
    step: 1,
    name: "YOUTUBE_API_KEY 환경 변수",
    status: hasApiKey ? "pass" : "fail",
    message: hasApiKey ? "설정됨" : "미설정 (.env.local 또는 Vercel 환경 변수에 추가)",
    detail: hasApiKey ? undefined : "YouTube Data API v3 호출에 필요합니다.",
  });
  if (!hasApiKey) allPass = false;

  // Step 2: 채널 ID 사용 가능 여부 + 포맷 검증
  const channelIdValid =
    channelIdAvailable != null &&
    channelIdAvailable !== "" &&
    isValidChannelId(channelIdAvailable);
  steps.push({
    step: 2,
    name: "채널 ID (env 또는 쿼리 channelId)",
    status: channelIdValid ? "pass" : "fail",
    message: channelIdValid
      ? "유효한 채널 ID"
      : !channelIdAvailable
        ? "채널 ID 없음 (쿼리 channelId 또는 YOUTUBE_CHANNEL_ID env)"
        : "채널 ID 포맷 오류 (UC로 시작, 24자 이상)",
    detail: channelIdAvailable && !isValidChannelId(channelIdAvailable)
      ? `입력값: ${channelIdAvailable.slice(0, 20)}...`
      : undefined,
  });
  if (!channelIdValid) allPass = false;

  // Step 3: videoId 포맷 검증 (선택, 있으면 검증)
  const videoIdValid =
    videoId == null || videoId === "" || isValidVideoId(videoId);
  steps.push({
    step: 3,
    name: "videoId 포맷 (쿼리, 11자)",
    status: videoIdValid ? "pass" : "fail",
    message: videoIdValid
      ? videoId
        ? "유효한 videoId"
        : "미제공 (선택)"
      : "videoId는 11자 영숫자/하이픈/언더스코어만 허용",
    detail:
      videoId && !isValidVideoId(videoId)
        ? `입력값 길이: ${videoId.length}`
        : undefined,
  });
  if (!videoIdValid) allPass = false;

  // Step 4: channel-live API 호출 및 응답 검증
  let step4Status: StepStatus = "pass";
  let step4Message = "channel-live API 정상 응답";
  let step4Detail: string | undefined;
  let responseValid = false;

  if (hasApiKey && (videoId || channelIdAvailable)) {
    try {
      const baseUrl =
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : process.env.VERCEL_BRANCH_URL ?? request.nextUrl.origin;
      const params = new URLSearchParams();
      if (videoId) params.set("videoId", videoId);
      if (channelIdParam) params.set("channelId", channelIdParam);
      const res = await fetch(
        `${baseUrl}/api/youtube/channel-live?${params.toString()}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      const hasLive = !!data.liveVideoId;
      const hasFallback = !!data.fallbackVideoId;
      const fallbackValid = hasFallback && isValidVideoId(data.fallbackVideoId);
      const liveValid = !data.liveVideoId || isValidVideoId(data.liveVideoId);

      responseValid = (hasLive && liveValid) || (hasFallback && fallbackValid);
      step4Status = responseValid ? "pass" : "fail";
      step4Message = responseValid
        ? hasLive
          ? "라이브 영상 ID 반환됨"
          : "fallback 영상 ID 반환됨"
        : "유효한 liveVideoId 또는 fallbackVideoId 없음";
      step4Detail = JSON.stringify({
        isLive: !!data.isLive,
        liveVideoId: data.liveVideoId ?? null,
        fallbackVideoId: data.fallbackVideoId ?? null,
        message: data.message ?? null,
      });
    } catch (e) {
      step4Status = "fail";
      step4Message = "channel-live API 호출 실패";
      step4Detail = e instanceof Error ? e.message : String(e);
      allPass = false;
    }
  } else {
    step4Status = "fail";
    step4Message = "videoId 또는 channelId가 없어 channel-live 호출 생략";
    step4Detail = "검증하려면 ?videoId=xxx&channelId=UCxxx 로 요청하세요.";
    allPass = false;
  }

  steps.push({
    step: 4,
    name: "channel-live API 응답",
    status: step4Status,
    message: step4Message,
    detail: step4Detail,
  });
  if (step4Status === "fail") allPass = false;

  // Step 5: 응답 ID 포맷 검증 (Step 4에서 이미 포함)
  steps.push({
    step: 5,
    name: "응답 ID 포맷 검증",
    status: responseValid ? "pass" : "fail",
    message: responseValid
      ? "liveVideoId/fallbackVideoId 포맷 유효"
      : "반환된 ID가 11자 videoId 포맷이 아님",
  });
  if (!responseValid) allPass = false;

  return NextResponse.json({
    ok: allPass,
    summary: allPass
      ? "모든 검증 통과"
      : "일부 검증 실패 (steps 참고)",
    steps,
  });
}

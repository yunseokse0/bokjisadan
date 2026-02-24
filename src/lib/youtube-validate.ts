/**
 * YouTube ID 포맷 검증
 * - videoId: 11자, [A-Za-z0-9_-]
 * - channelId: UC로 시작, 24자 (UC + 22자)
 */

const VIDEO_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;
const CHANNEL_ID_REGEX = /^UC[A-Za-z0-9_-]{22,}$/;

export function isValidVideoId(value: string | null | undefined): boolean {
  if (value == null || typeof value !== "string") return false;
  return VIDEO_ID_REGEX.test(value.trim());
}

export function isValidChannelId(value: string | null | undefined): boolean {
  if (value == null || typeof value !== "string") return false;
  return CHANNEL_ID_REGEX.test(value.trim());
}

export function getVideoIdFromUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    if (url.includes("youtube.com") && url.includes("v=")) {
      const id = new URL(url).searchParams.get("v");
      return id ? id.trim() : null;
    }
    return url.trim() || null;
  } catch {
    return null;
  }
}

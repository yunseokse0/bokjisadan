/**
 * 복지사단 - 피터패트와 크루 멤버 정보
 * 수장: 피터패트 (유튜브)
 */

/** 복지사단 유튜브 채널 · 대표 영상 링크 */
export const YOUTUBE_CHANNEL_VIDEO = "https://www.youtube.com/watch?v=Ea3FhctM0v8";

/** 영상 ID로 유튜브 썸네일 URL 반환 (hqdefault: 480x360) */
export function getYoutubeThumbnailUrl(videoUrlOrId: string): string {
  const id = videoUrlOrId.includes("youtube.com")
    ? new URL(videoUrlOrId).searchParams.get("v") ?? videoUrlOrId
    : videoUrlOrId;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export type Role = "leader" | "staff" | "member";

export interface CrewMember {
  id: string;
  name: string;
  role: Role;
  roleLabel: string;
  /** 사단 내 역할: 전략기획, 현장대장, 분위기메이커 등 */
  roleDetail?: string;
  platform?: string;
  channelUrl?: string;
  imageUrl?: string;
  description?: string;
  /** 툴팁용: 최근 활동 내용 */
  recentActivity?: string;
}

export const CREW_LEADER: CrewMember = {
  id: "peterpat",
  name: "피터패트",
  role: "leader",
  roleLabel: "수장",
  roleDetail: "총괄 · 방송 기획",
  platform: "youtube",
  channelUrl: YOUTUBE_CHANNEL_VIDEO,
  description: "복지사단 수장",
  recentActivity: "야킹 라이브 진행 중",
};

export const STAFF_MEMBERS: CrewMember[] = [
  {
    id: "staff-1",
    name: "운영진 A",
    role: "staff",
    roleLabel: "운영진",
    roleDetail: "전략기획 · 스케줄",
    platform: "youtube",
    description: "방송 운영",
    recentActivity: "주간 편성 정리",
  },
  {
    id: "staff-2",
    name: "운영진 B",
    role: "staff",
    roleLabel: "운영진",
    roleDetail: "컨텐츠 기획",
    platform: "youtube",
    description: "컨텐츠 기획",
    recentActivity: "이벤트 기획 참여",
  },
];

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: "member-1",
    name: "멤버 1",
    role: "member",
    roleLabel: "멤버",
    roleDetail: "현장대장 · 분위기메이커",
    platform: "youtube",
    description: "야킹/술먹방",
    recentActivity: "최근 게스트 출연",
  },
  {
    id: "member-2",
    name: "멤버 2",
    role: "member",
    roleLabel: "멤버",
    roleDetail: "게스트",
    platform: "youtube",
    description: "게스트",
    recentActivity: "술먹방 참여",
  },
  {
    id: "member-3",
    name: "멤버 3",
    role: "member",
    roleLabel: "멤버",
    roleDetail: "게스트",
    platform: "youtube",
    description: "게스트",
    recentActivity: "예정",
  },
];

export const ALL_CREW = [CREW_LEADER, ...STAFF_MEMBERS, ...CREW_MEMBERS];

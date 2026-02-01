/**
 * 복지사단 - 피터패트와 크루 멤버 정보
 * 수장: 피터패트 (유튜브)
 */

export type Role = "leader" | "staff" | "member";

export interface CrewMember {
  id: string;
  name: string;
  role: Role;
  roleLabel: string;
  platform?: string; // youtube, twitch, chzzk 등
  channelUrl?: string;
  imageUrl?: string;
  description?: string;
}

export const CREW_LEADER: CrewMember = {
  id: "peterpat",
  name: "피터패트",
  role: "leader",
  roleLabel: "수장",
  platform: "youtube",
  channelUrl: "https://www.youtube.com/@peterpat",
  description: "복지사단 수장",
};

// 운영진 예시 (실제 데이터로 교체 가능)
export const STAFF_MEMBERS: CrewMember[] = [
  {
    id: "staff-1",
    name: "운영진 A",
    role: "staff",
    roleLabel: "운영진",
    platform: "youtube",
    description: "방송 운영",
  },
  {
    id: "staff-2",
    name: "운영진 B",
    role: "staff",
    roleLabel: "운영진",
    platform: "youtube",
    description: "컨텐츠 기획",
  },
];

// 멤버 예시 (실제 데이터로 교체 가능)
export const CREW_MEMBERS: CrewMember[] = [
  {
    id: "member-1",
    name: "멤버 1",
    role: "member",
    roleLabel: "멤버",
    platform: "youtube",
    description: "야킹/술먹방",
  },
  {
    id: "member-2",
    name: "멤버 2",
    role: "member",
    roleLabel: "멤버",
    platform: "youtube",
    description: "게스트",
  },
  {
    id: "member-3",
    name: "멤버 3",
    role: "member",
    roleLabel: "멤버",
    platform: "youtube",
    description: "게스트",
  },
];

export const ALL_CREW = [CREW_LEADER, ...STAFF_MEMBERS, ...CREW_MEMBERS];

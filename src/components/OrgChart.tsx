"use client";

import { CREW_LEADER, STAFF_MEMBERS, CREW_MEMBERS, type CrewMember } from "@/constants/crew";

function ProfileCard({ member, size = "md" }: { member: CrewMember; size?: "lg" | "md" | "sm" }) {
  const sizeClasses = {
    lg: "w-28 h-28 md:w-36 md:h-36 text-lg",
    md: "w-20 h-20 md:w-24 md:h-24 text-sm",
    sm: "w-14 h-14 md:w-16 md:h-16 text-xs",
  };
  const ringClasses = {
    lg: "ring-4 ring-orange-500/60",
    md: "ring-2 ring-orange-500/50",
    sm: "ring-2 ring-orange-500/40",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} ${ringClasses[size]} rounded-full bg-zinc-700 flex items-center justify-center font-bold text-orange-400 border-2 border-orange-500/30 shadow-lg shadow-orange-500/20`}
        title={member.description}
      >
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="truncate px-1">{member.name.slice(0, 2)}</span>
        )}
      </div>
      <span className="font-semibold text-foreground">{member.name}</span>
      <span className="text-xs text-orange-400/90">{member.roleLabel}</span>
    </div>
  );
}

/** 수장 → 운영진 → 멤버를 잇는 세로 연결선 */
function ConnectorLine() {
  return (
    <div className="flex justify-center my-2">
      <div className="w-px h-6 bg-gradient-to-b from-orange-500/60 to-orange-500/30" />
    </div>
  );
}

export default function OrgChart() {
  return (
    <section className="py-12 md:py-16 px-4" id="org-chart">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-10">
        복지사단 조직도
      </h2>

      {/* 수장 (중앙 상단, 가장 큰 프로필) */}
      <div className="flex flex-col items-center">
        <ProfileCard member={CREW_LEADER} size="lg" />
        <ConnectorLine />
      </div>

      {/* 운영진 */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-sm text-orange-400/90">운영진</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {STAFF_MEMBERS.map((m) => (
            <ProfileCard key={m.id} member={m} size="md" />
          ))}
        </div>
        <ConnectorLine />
      </div>

      {/* 멤버 (세로형 리스트·그리드로 반응형) */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-sm text-orange-400/90">멤버</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {CREW_MEMBERS.map((m) => (
            <ProfileCard key={m.id} member={m} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}

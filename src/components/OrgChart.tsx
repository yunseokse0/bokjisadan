"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CREW_LEADER, STAFF_MEMBERS, CREW_MEMBERS, type CrewMember } from "@/constants/crew";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function ProfileCard({
  member,
  size = "md",
}: {
  member: CrewMember;
  size?: "lg" | "md" | "sm";
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const sizeClasses = {
    lg: "w-32 h-32 md:w-40 md:h-40 text-xl",
    md: "w-24 h-24 md:w-28 md:h-28 text-base",
    sm: "w-16 h-16 md:w-20 md:h-20 text-sm",
  };

  const tooltipContent = member.recentActivity ?? member.roleDetail ?? member.description;

  const cardInner = (
    <div
      className="relative flex flex-col items-center gap-2 group"
      onMouseEnter={() => setShowTooltip(!!tooltipContent)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-zinc-300 overflow-hidden transition-transform duration-300 group-hover:scale-105
          bg-gradient-to-br from-zinc-700 to-zinc-800
          ring-2 ring-white/20 ring-offset-2 ring-offset-[#0a0a0a]
          shadow-lg
        `}
      >
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className="truncate px-1 select-none">{member.name.slice(0, 2)}</span>
        )}
      </div>
      <span className="font-semibold text-foreground text-sm md:text-base">{member.name}</span>
      <span className="text-xs text-zinc-500 font-medium">{member.roleLabel}</span>
      {member.roleDetail && (
        <span className="text-[10px] text-zinc-500 max-w-[100px] text-center truncate">
          {member.roleDetail}
        </span>
      )}
      {showTooltip && tooltipContent && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 whitespace-nowrap shadow-xl"
          role="tooltip"
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );

  const wrapped = member.channelUrl ? (
    <Link href={member.channelUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
      {cardInner}
    </Link>
  ) : (
    cardInner
  );

  return <motion.div variants={item}>{wrapped}</motion.div>;
}

function ConnectorLine() {
  return (
    <motion.div
      variants={item}
      className="flex justify-center my-4 md:my-6"
    >
      <div className="w-px h-8 bg-gradient-to-b from-white/30 via-white/20 to-transparent rounded-full" />
    </motion.div>
  );
}

export default function OrgChart() {
  return (
    <section className="py-14 md:py-20 px-4" id="org-chart">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title text-2xl md:text-3xl text-center mb-12 md:mb-14"
      >
        복지사단 조직도
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="section-card p-8 md:p-12 max-w-3xl mx-auto border-[#262626]"
      >
        <div className="flex flex-col items-center">
          <ProfileCard member={CREW_LEADER} size="lg" />
          <ConnectorLine />
        </div>

        <div className="flex flex-col items-center gap-5 mt-2">
          <motion.span
            variants={item}
            className="text-xs font-semibold text-zinc-500 tracking-wider uppercase"
          >
            운영진
          </motion.span>
          <motion.div
            variants={container}
            className="flex flex-wrap justify-center gap-8 md:gap-10"
          >
            {STAFF_MEMBERS.map((m) => (
              <ProfileCard key={m.id} member={m} size="md" />
            ))}
          </motion.div>
          <ConnectorLine />
        </div>

        <div className="flex flex-col items-center gap-5 mt-2">
          <motion.span
            variants={item}
            className="text-xs font-semibold text-zinc-500 tracking-wider uppercase"
          >
            멤버
          </motion.span>
          <motion.div
            variants={container}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {CREW_MEMBERS.map((m) => (
              <ProfileCard key={m.id} member={m} size="sm" />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

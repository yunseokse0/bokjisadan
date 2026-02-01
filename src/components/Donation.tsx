"use client";

import { useState } from "react";

interface Donor {
  name: string;
  amount?: string;
  totalCount?: number;
  tier?: "gold" | "silver" | "bronze";
  message?: string;
  date?: string;
}

const MOCK_DONORS: Donor[] = [
  { name: "후원자 A", amount: "50,000원", totalCount: 12, tier: "gold", message: "항상 응원합니다!", date: "2024.01" },
  { name: "후원자 B", amount: "30,000원", totalCount: 5, tier: "silver", message: "복지사단 화이팅", date: "2024.01" },
  { name: "익명의 후원자", amount: "100,000원", totalCount: 3, tier: "gold", date: "2024.02" },
];

const DONATION_ACCOUNT = {
  bank: "○○은행",
  accountNumber: "000-000000-00-000",
  holder: "복지사단",
  note: "후원 시 방송에서 이름 소개를 원하시면 메모란에 닉네임을 남겨주세요.",
};

function TierIcon({ tier }: { tier: Donor["tier"] }) {
  if (!tier) return null;
  const color =
    tier === "gold"
      ? "text-[#d4af37]"
      : tier === "silver"
        ? "text-zinc-400"
        : "text-amber-600";
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${color} border-current text-xs font-bold`} aria-label={`등급: ${tier}`}>
      {tier === "gold" ? "G" : tier === "silver" ? "S" : "B"}
    </span>
  );
}

export default function Donation() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DONATION_ACCOUNT.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 px-3 sm:px-0">
      <div className="section-card p-4 sm:p-6 md:p-8 border-[#262626]">
        <h3 className="text-lg font-semibold text-[#ff4d00] mb-5 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-[#ff4d00]" />
          후원 계좌
        </h3>
        <div className="space-y-3 text-foreground">
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-zinc-500">은행</span>
            <span className="font-medium">{DONATION_ACCOUNT.bank}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-zinc-500">계좌번호</span>
            <span className="font-mono font-medium tracking-wide">
              {DONATION_ACCOUNT.accountNumber}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">예금주</span>
            <span className="font-medium">{DONATION_ACCOUNT.holder}</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-zinc-500 leading-relaxed">
          {DONATION_ACCOUNT.note}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-5 px-5 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e64500] text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          {copied ? "복사됨 ✓" : "계좌번호 복사"}
        </button>
      </div>

      <div className="section-card p-4 sm:p-6 md:p-8 border-[#262626]">
        <h3 className="text-lg font-semibold text-[#ff4d00] mb-4 sm:mb-5 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-[#ff4d00]" />
          명예의 전당 (큰손 기록)
        </h3>
        <ul className="space-y-4">
          {MOCK_DONORS.map((d, i) => (
            <li
              key={i}
              className="flex flex-wrap items-start gap-3 rounded-lg border border-white/5 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2">
                <TierIcon tier={d.tier} />
                <span className="font-semibold text-foreground">{d.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                <span className="text-[#ff4d00]/90 font-medium">{d.amount}</span>
                {d.totalCount != null && (
                  <span className="text-zinc-500">· 총 {d.totalCount}회 후원</span>
                )}
                {d.date && <span className="text-zinc-500">· {d.date}</span>}
              </div>
              {d.message && (
                <p className="w-full text-sm text-zinc-400 italic mt-1">"{d.message}"</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

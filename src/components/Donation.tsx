"use client";

interface Donor {
  name: string;
  amount?: string;
  date?: string;
}

// 예시 후원자 (명예의 전당)
const MOCK_DONORS: Donor[] = [
  { name: "후원자 A", amount: "50,000원", date: "2024.01" },
  { name: "후원자 B", amount: "30,000원", date: "2024.01" },
  { name: "익명의 후원자", amount: "100,000원", date: "2024.02" },
];

const DONATION_ACCOUNT = {
  bank: "○○은행",
  accountNumber: "000-000000-00-000",
  holder: "복지사단",
  note: "후원 시 방송에서 이름 소개를 원하시면 메모란에 닉네임을 남겨주세요.",
};

export default function Donation() {
  return (
    <section className="py-12 px-4" id="donation">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-8">
        후원 및 명예의 전당
      </h2>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* 후원 계좌 */}
        <div className="rounded-xl bg-zinc-800/80 border border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            후원 계좌
          </h3>
          <div className="space-y-2 text-foreground">
            <p>
              <span className="text-zinc-400">은행</span> {DONATION_ACCOUNT.bank}
            </p>
            <p>
              <span className="text-zinc-400">계좌번호</span>{" "}
              {DONATION_ACCOUNT.accountNumber}
            </p>
            <p>
              <span className="text-zinc-400">예금주</span>{" "}
              {DONATION_ACCOUNT.holder}
            </p>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            {DONATION_ACCOUNT.note}
          </p>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(DONATION_ACCOUNT.accountNumber)
            }
            className="mt-4 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
          >
            계좌번호 복사
          </button>
        </div>

        {/* 명예의 전당 */}
        <div className="rounded-xl bg-zinc-800/80 border border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            명예의 전당
          </h3>
          <ul className="space-y-2">
            {MOCK_DONORS.map((d, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-0"
              >
                <span className="font-medium text-foreground">{d.name}</span>
                <span className="text-sm text-orange-400/90">
                  {d.amount}
                  {d.date && ` · ${d.date}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

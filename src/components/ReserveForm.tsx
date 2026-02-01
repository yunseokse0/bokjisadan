"use client";

import { useState } from "react";

export default function ReserveForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          age: age.trim() || undefined,
          contact: contact.trim() || undefined,
          reason: reason.trim() || undefined,
          preferredDate: date || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "요청 처리에 실패했습니다.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "접수되었습니다.");
      setName("");
      setAge("");
      setContact("");
      setReason("");
      setDate("");
    } catch {
      setStatus("error");
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-600 text-foreground placeholder-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-white/10 transition-all";

  return (
    <section className="py-14 md:py-20 px-4" id="reserve">
      <h2 className="section-title text-2xl md:text-3xl text-center mb-4">
        게스트 예약
      </h2>
      <p className="text-center text-zinc-500 text-sm mb-8 max-w-md mx-auto">
        야킹·술먹방 등 게스트로 참여를 원하시면 희망 일정과 함께 신청해 주세요.
      </p>

      <form
        onSubmit={handleSubmit}
        className="section-card max-w-md mx-auto p-4 sm:p-6 md:p-8 space-y-5 border-[#262626] mx-3 sm:mx-auto"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">
            이름 <span className="text-zinc-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
            placeholder="닉네임 또는 이름"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-zinc-400 mb-1.5">
            나이
          </label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputClass}
            placeholder="선택"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-zinc-400 mb-1.5">
            연락처
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputClass}
            placeholder="연락 가능한 수단"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-zinc-400 mb-1.5">
            희망 일정 (날짜 선택)
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-zinc-400 mb-1.5">
            신청 사유
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={inputClass}
          >
            <option value="">선택</option>
            <option value="야킹">야킹</option>
            <option value="술먹방">술먹방</option>
            <option value="기타">기타</option>
          </select>
        </div>
        {message && (
          <p
            className={`text-sm py-2 px-3 rounded-lg ${
              status === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl bg-white text-black font-semibold transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {status === "loading" ? "접수 중..." : "예약 신청"}
        </button>
      </form>
    </section>
  );
}

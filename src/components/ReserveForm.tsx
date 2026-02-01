"use client";

import { useState } from "react";

export default function ReserveForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
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
    } catch {
      setStatus("error");
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <section className="py-12 px-4" id="reserve">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-8">
        게스트 예약 (야킹/술먹방 등)
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto rounded-xl bg-zinc-800/80 border border-zinc-700 p-6 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
            이름 <span className="text-orange-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-foreground placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="닉네임 또는 이름"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-zinc-300 mb-1">
            나이
          </label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-foreground placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="선택"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-zinc-300 mb-1">
            연락처
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-foreground placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="연락 가능한 수단"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-zinc-300 mb-1">
            신청 사유
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-foreground focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">선택</option>
            <option value="야킹">야킹</option>
            <option value="술먹방">술먹방</option>
            <option value="기타">기타</option>
          </select>
        </div>
        {message && (
          <p
            className={`text-sm ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {status === "loading" ? "접수 중..." : "예약 신청"}
        </button>
      </form>
    </section>
  );
}

import { NextRequest, NextResponse } from "next/server";

/**
 * 게스트 예약 폼 → 텔레그램 봇으로 전송
 * 환경변수: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, contact, reason, preferredDate } = body as {
      name?: string;
      age?: string;
      contact?: string;
      reason?: string;
      preferredDate?: string;
    };

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "이름을 입력해 주세요." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
      return NextResponse.json(
        { success: true, message: "예약 요청이 접수되었습니다. (알림 미연동)" },
        { status: 200 }
      );
    }

    const text = [
      "🆕 [복지사단] 게스트 예약 신청",
      `이름: ${name}`,
      `나이: ${age ?? "-"}`,
      `연락처: ${contact ?? "-"}`,
      `희망 일정: ${preferredDate ?? "-"}`,
      `신청 사유: ${reason ?? "-"}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "예약 요청이 접수되었습니다.",
    });
  } catch (e) {
    console.error("reserve API error:", e);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

"use client";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

interface ScheduleSlot {
  day: number; // 0=월
  time: string;
  title: string;
  host?: string;
}

// 예시 데이터 (실제 편성표로 교체 가능)
const MOCK_SCHEDULE: ScheduleSlot[] = [
  { day: 0, time: "20:00", title: "야킹 라이브", host: "피터패트" },
  { day: 2, time: "21:00", title: "술먹방", host: "운영진 A" },
  { day: 5, time: "19:00", title: "주말 특별 방송", host: "피터패트" },
];

export default function Schedule() {
  const getSlotsByDay = (day: number) =>
    MOCK_SCHEDULE.filter((s) => s.day === day);

  return (
    <section className="py-12 px-4" id="schedule">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-400 mb-8">
        주간 방송 편성표
      </h2>
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <div className="min-w-[320px] grid grid-cols-7 gap-2">
          {WEEKDAYS.map((label, dayIndex) => (
            <div
              key={dayIndex}
              className="rounded-lg bg-zinc-800/80 border border-zinc-700 p-3"
            >
              <p className="text-center font-semibold text-orange-400 mb-2">
                {label}
              </p>
              <div className="space-y-2">
                {getSlotsByDay(dayIndex).length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center">—</p>
                ) : (
                  getSlotsByDay(dayIndex).map((slot, i) => (
                    <div
                      key={i}
                      className="text-xs bg-zinc-700/80 rounded p-2 border-l-2 border-orange-500"
                    >
                      <span className="text-orange-300">{slot.time}</span>
                      <p className="font-medium text-foreground truncate">
                        {slot.title}
                      </p>
                      {slot.host && (
                        <p className="text-zinc-400 truncate">{slot.host}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

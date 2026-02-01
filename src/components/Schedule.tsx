"use client";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

interface ScheduleSlot {
  day: number;
  time: string;
  title: string;
  host?: string;
}

const MOCK_SCHEDULE: ScheduleSlot[] = [
  { day: 0, time: "20:00", title: "야킹 라이브", host: "피터패트" },
  { day: 2, time: "21:00", title: "술먹방", host: "운영진 A" },
  { day: 5, time: "19:00", title: "주말 특별 방송", host: "피터패트" },
];

export default function Schedule() {
  const getSlotsByDay = (day: number) =>
    MOCK_SCHEDULE.filter((s) => s.day === day);

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section className="py-14 md:py-20 px-4" id="schedule">
      <h2 className="section-title text-2xl md:text-3xl text-center mb-10">
        주간 방송 편성표
      </h2>
      <div className="max-w-4xl mx-auto overflow-x-auto pb-2">
        <div className="min-w-[340px] grid grid-cols-7 gap-3">
          {WEEKDAYS.map((label, dayIndex) => (
            <div
              key={dayIndex}
              className={`
                section-card rounded-xl p-4 transition-all
                ${dayIndex === todayIndex
                  ? "ring-2 ring-white/20 shadow-lg"
                  : ""
                }
              `}
            >
              <p
                className={`text-center font-semibold mb-3 text-sm
                  ${dayIndex === todayIndex ? "text-orange-400" : "text-zinc-400"}
                `}
              >
                {label}
                {dayIndex === todayIndex && (
                  <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">
                    오늘
                  </span>
                )}
              </p>
              <div className="space-y-2 min-h-[60px]">
                {getSlotsByDay(dayIndex).length === 0 ? (
                  <p className="text-xs text-zinc-600 text-center py-2">—</p>
                ) : (
                  getSlotsByDay(dayIndex).map((slot, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-zinc-800/60 border-l-2 border-zinc-500 p-2.5 text-xs hover:bg-zinc-800/80 transition-colors"
                    >
                      <span className="text-zinc-400 font-medium">{slot.time}</span>
                      <p className="font-medium text-foreground truncate mt-0.5">
                        {slot.title}
                      </p>
                      {slot.host && (
                        <p className="text-zinc-500 truncate mt-0.5">{slot.host}</p>
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

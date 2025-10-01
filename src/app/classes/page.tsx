// src/app/classes/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes • Weekly Schedule",
  description: "Weekly class schedule powered by the Laravel API.",
};

// --- Types that match your API shape ---
type Teacher = {
  id: number;
  name: string;
  email: string;
  pivot?: { role?: string; is_primary?: boolean };
};

type Lesson = {
  id: number;
  title: string;
  description?: string;
  image?: string;
};

type ClassFromApi = {
  id: number;
  day: string;             // e.g. "Monday"
  start_time: string;      // "HH:mm:ss"
  end_time: string;        // "HH:mm:ss"
  capacity: number;
  lesson: Lesson;
  teachers: Teacher[];
};

type ApiResponse = { classes: ClassFromApi[] };

// --- Helpers ---
const DAY_ORDER: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function toDisplayTime(hms: string) {
  // hms like "06:15:00" -> "6:15 AM"
  const [h, m, s] = hms.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, s || 0, 0);
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

function groupByDay(data: ClassFromApi[]) {
  // Ensure all 7 days exist (even if empty)
  const days = Object.keys(DAY_ORDER).map((day) => ({
    day,
    classes: [] as ClassFromApi[],
  }));

  const bucket = new Map(days.map((d) => [d.day, d.classes]));

  for (const item of data) {
    const key = bucket.has(item.day) ? item.day : item.day.trim();
    (bucket.get(key) ?? bucket.get("Monday")!)?.push(item);
  }

  // Sort inside each day by start_time
  for (const arr of bucket.values()) {
    arr.sort((a, b) => a.start_time.localeCompare(b.start_time));
  }

  // Return in Monday → Sunday order
  return days.sort((a, b) => DAY_ORDER[a.day] - DAY_ORDER[b.day]);
}

// --- Data fetch (server-side, ISR) ---
export const revalidate = 300; // 5 minutes

async function getWeeklyClasses(): Promise<ClassFromApi[]> {
  // Point this to your real endpoint; leaving path as /api/classes
  const base = process.env.LARAVEL_API_BASE!;
  const url = `${base.replace(/\/+$/, "")}/api/classes`;

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`Classes fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as ApiResponse;
  return json.classes || [];
}

// --- Page ---
export default async function ClassesPage() {
  const classes = await getWeeklyClasses();
  const grouped = groupByDay(classes);

  return (
    <main className="min-h-screen bg-zinc-950">
      <section className="mx-auto w-full max-w-[1500px] 2xl:max-w-[1600px] px-4 py-14 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Weekly Class Schedule
          </h1>
          <p className="mt-2 text-zinc-400">
            Times are local to the gym. Schedule may change.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
          {grouped.map(({ day, classes }) => (
            <article
              key={day}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-sm ring-1 ring-black/5"
            >
              <div className="rounded-t-2xl bg-[#dc2626] px-4 py-3">
                <h2 className="text-lg font-semibold tracking-wide text-white">
                  {day}
                </h2>
              </div>

              <div className="px-4 py-4">
                {classes.length === 0 ? (
                  <p className="text-center text-zinc-300">Rest Day</p>
                ) : (
                  <ul className="space-y-4">
                    {classes.map((c) => (
                      <li
                        key={c.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-zinc-100">
                            {c.lesson?.title ?? "Class"}
                          </p>
                          <span className="text-xs text-zinc-400">
                            Cap: {c.capacity}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-400">
                          {toDisplayTime(c.start_time)} – {toDisplayTime(c.end_time)}
                        </p>

                        {c.teachers?.length ? (
                          <p className="mt-1 text-xs text-zinc-500">
                            Coach{c.teachers.length > 1 ? "es" : ""}:{" "}
                            {c.teachers.map((t) => t.name).join(", ")}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-zinc-400">
          Want private sessions or kids classes?{" "}
          <a
            href="/contact"
            className="font-medium text-rose-400 underline-offset-4 hover:underline"
          >
            Contact us
          </a>
          .
        </div>
      </section>
    </main>
  );
}

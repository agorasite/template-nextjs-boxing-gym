// src/lib/classes.ts
export type ClassLevel = 'Beginner' | 'All Levels' | 'Intermediate' | 'Advanced';

export type GymClass = {
  id: number;
  title: string;
  level: ClassLevel;
  duration: number; // minutes
  coach: string;
  days: Array<'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'>;
  time: string;     // "18:30"
  img: string;
  tags: string[];
  summary: string;
  capacity?: number;
};

// --- API shapes you likely return from Laravel (adjust if needed) ---
type ApiClass = {
  id: number;
  title: string;
  level?: string;
  duration_minutes?: number;
  coach_name?: string;
  coach?: string;
  image_url?: string;
  img?: string;
  tags?: string[] | string;
  summary?: string;
  description?: string;
  sessions?: Array<{
    day_of_week?: number | string; // 1=Mon..7=Sun OR "Mon"
    day?: string;
    start_time?: string;           // "18:30"
    time?: string;                 // alt key
  }>;
};

type ApiResponse = { classes: ApiClassV2[] }

type ApiTeacher = {
  id: number
  name: string
  email: string
  pivot?: { role?: string; is_primary?: boolean }
}

type ApiLesson = {
  id: number
  title: string
  description?: string
  image?: string // may be relative like "/templates/..."
}

type ApiClassV2 = {
  id: number
  day: string                // "Monday" | "Tuesday" | ...
  start_time: string         // "HH:MM:SS"
  end_time: string           // "HH:MM:SS"
  capacity: number
  lesson: ApiLesson
  teachers: ApiTeacher[]
}

const DAY_MAP: Record<string, 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|null> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: null, // UI has no Sunday filter; keep it visible in "All"
}

function inferLevelFromLesson(title: string): 'Beginner' | 'All Levels' | 'Intermediate' | 'Advanced' {
  const t = title.toLowerCase()
  if (/(fundamentals|intro|beginner|basics)/.test(t)) return 'Beginner'
  if (/(advanced|elite|pro)/.test(t)) return 'Advanced'
  if (/(sparring|technique|intermediate)/.test(t)) return 'Intermediate'
  return 'All Levels'
}


function hhmm(ss: string) {
  // "HH:MM:SS" -> "HH:MM"
  const [h='00', m='00'] = ss.split(':')
  return `${h.padStart(2,'0')}:${m.padStart(2,'0')}`
}

function minutesDiff(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const s = sh*60 + sm
  const e = eh*60 + em
  return Math.max(30, e - s) // clamp minimum 30min just in case
}

function absoluteImage(src?: string): string {
  if (!src) return '/images/gym-1.jpg'
  if (/^https?:\/\//i.test(src)) return src
  const base = process.env.LARAVEL_API_BASE ?? ''
  return base.replace(/\/$/, '') + (src.startsWith('/') ? src : `/${src}`)
}

function mapFromClassesEndpoint(c: ApiClassV2): GymClass {
  const short = DAY_MAP[c.day.toLowerCase()] // may be null for Sunday
  const primary = c.teachers.find(t => t.pivot?.is_primary) ?? c.teachers[0]
    const level = inferLevelFromLesson(c.lesson.title)

    return {
    id: c.id,
    title: c.lesson.title,
    level,
    duration: minutesDiff(c.start_time, c.end_time),
    coach: primary?.name ?? 'Coach',
    days: short ? [short] : ([] as GymClass['days']),   // empty => Sunday (UI shows "Sun")
    time: hhmm(c.start_time),
    img: absoluteImage(c.lesson.image),
    tags: [
        c.lesson.title,
        ...(primary?.pivot?.role ? [primary.pivot.role] : []),
        c.day,                                            // e.g., "Tuesday"
    ],
    summary: c.lesson.description ?? '',
    capacity: c.capacity,
    }
}

function isApiResponse(x: unknown): x is ApiResponse {
  if (!x || typeof x !== 'object') return false
  const rec = x as Record<string, unknown>
  return Array.isArray(rec.classes)
}

function getErrorInfo(err: unknown) {
  if (err instanceof Error) return { message: err.message, name: err.name }
  return { message: String(err) }
}

export async function fetchClasses(): Promise<GymClass[]> {
  const base = process.env.LARAVEL_API_BASE
  const apiKey = process.env.LARAVEL_API_KEY
  if (!base) throw new Error('Missing LARAVEL_API_BASE in env')

  const url = `${base.replace(/\/$/, '')}/api/classes`
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`

  try {
    const res = await fetch(url, { headers, next: { revalidate: 300 } })
    if (!res.ok) {
      console.error('fetchClasses HTTP error', res.status, await safeText(res))
      return []
    }
    const json: unknown = await res.json()
    const arr = isApiResponse(json) ? json.classes : []
    return arr.map(mapFromClassesEndpoint)
  } catch (err: unknown) {
    console.error('fetchClasses network error', { url, ...getErrorInfo(err) })
    return []
  }
}

async function safeText(res: Response) {
  try { return await res.text(); } catch { return '<no-body>'; }
}

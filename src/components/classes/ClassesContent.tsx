'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import ClassGrid from './ClassGrid'

export type ClassLevel = 'Beginner' | 'All Levels' | 'Intermediate' | 'Advanced'
export type GymClass = {
  id: number
  title: string
  level: ClassLevel
  duration: number // minutes
  coach: string
  days: Array<'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'>
  time: string      // "18:30"
  img: string
  tags: string[]
  summary: string
}

// ---- SAMPLE DATA (stable, module scope) ----
const ALL_CLASSES: GymClass[] = [
  {
    id: 1,
    title: 'Boxing Fundamentals',
    level: 'Beginner',
    duration: 60,
    coach: 'Giannis',
    days: ['Mon','Wed','Fri'],
    time: '18:30',
    img: '/images/gym-1.jpg',
    tags: ['Technique', 'Footwork', 'Bag work'],
    summary: 'Learn stance, guard, footwork, jab-cross, and combos with pads & bags.',
  },
  {
    id: 2,
    title: 'HIIT Boxing',
    level: 'All Levels',
    duration: 45,
    coach: 'Eleni',
    days: ['Tue','Thu','Sat'],
    time: '19:15',
    img: '/images/gym-2.jpg',
    tags: ['Conditioning', 'Intervals', 'Sweat'],
    summary: 'High-intensity rounds mixing mitts, bags, core, and bodyweight.',
  },
  {
    id: 3,
    title: 'Sparring Fundamentals',
    level: 'Intermediate',
    duration: 75,
    coach: 'Nikos',
    days: ['Wed','Fri'],
    time: '20:00',
    img: '/images/gym-5.jpg',
    tags: ['Ring IQ', 'Defense', 'Timing'],
    summary: 'Controlled contact, defense-first sparring, and fight IQ drills.',
  },
  {
    id: 4,
    title: 'Strength & Conditioning',
    level: 'All Levels',
    duration: 60,
    coach: 'Eleni',
    days: ['Mon','Thu','Sat'],
    time: '17:30',
    img: '/images/gym-6.jpg',
    tags: ['Strength', 'Mobility', 'Power'],
    summary: 'Smart strength sessions for speed, power, and longevity.',
  },
  {
    id: 5,
    title: 'Advanced Boxing',
    level: 'Advanced',
    duration: 75,
    coach: 'Giannis',
    days: ['Tue','Thu'],
    time: '20:15',
    img: '/images/gym-8.jpg',
    tags: ['Advanced', 'Strategy', 'Conditioning'],
    summary: 'High-pace technical work, ring generalship, and advanced combos.',
  },
  {
    id: 6,
    title: 'Women Only Boxing',
    level: 'All Levels',
    duration: 60,
    coach: 'Eleni',
    days: ['Sat'],
    time: '11:00',
    img: '/images/gym-9.jpg',
    tags: ['Supportive', 'Technique', 'Cardio'],
    summary: 'Technique-first boxing class in a supportive crew environment.',
  },
]

const LEVELS: Array<{label: ClassLevel | 'All'; value: ClassLevel | 'All'}> = [
  { label: 'All', value: 'All' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'All Levels', value: 'All Levels' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
]

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat'] as const
type Day = typeof DAYS[number]

export default function ClassesContent() {
  // Filters
  const [q, setQ] = useState('')
  const [level, setLevel] = useState<ClassLevel | 'All'>('All')
  const [day, setDay] = useState<Day | 'All'>('All')

  // keep UI responsive while typing
  const qDeferred = useDeferredValue(q)

  const filtered = useMemo(() => {
    const qlc = qDeferred.trim().toLowerCase()
    return ALL_CLASSES.filter(c => {
      const matchesQ = !qlc
        || c.title.toLowerCase().includes(qlc)
        || c.tags.join(' ').toLowerCase().includes(qlc)
        || c.summary.toLowerCase().includes(qlc)
        || c.coach.toLowerCase().includes(qlc)
      const matchesLevel = level === 'All' ? true : c.level === level
      const matchesDay = day === 'All' ? true : c.days.includes(day)
      return matchesQ && matchesLevel && matchesDay
    })
  }, [qDeferred, level, day])

  return (
    <section className="bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Filters */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search classes, tags, coach…"
              className="w-full rounded-xl border border-white/15 bg-neutral-900 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-[var(--brand-red)] sm:max-w-sm"
            />

            <div className="flex flex-wrap gap-2">
              {LEVELS.map(l => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={[
                    'rounded-full px-3 py-1 text-xs font-medium border',
                    level === l.value
                      ? 'border-[var(--brand-red)] bg-[var(--brand-red)] text-white'
                      : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10',
                  ].join(' ')}
                >
                  {l.label}
                </button>
              ))}

              <select
                value={day}
                onChange={(e) => setDay(e.target.value as Day | 'All')}
                className="rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white outline-none hover:bg-white/5"
                aria-label="Filter by day"
              >
                <option value="All">All days</option>
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          <span>{filtered.length} class{filtered.length === 1 ? '' : 'es'} found</span>
          <span>
            Tip: type <span className="text-[var(--brand-red)]">sparring</span> or{' '}
            <span className="text-[var(--brand-red)]">beginner</span>
          </span>
        </div>

        {/* Grid */}
        <div className="mt-6">
          <ClassGrid classes={filtered} />
        </div>
      </div>
    </section>
  )
}

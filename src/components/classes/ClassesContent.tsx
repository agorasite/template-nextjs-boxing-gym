'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import ClassGrid from './ClassGrid'
import type { GymClass, ClassLevel } from '@/lib/classes'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat'] as const
type Day = typeof DAYS[number]

type Props = {
  initialClasses: GymClass[]
}

const LEVELS: Array<{label: ClassLevel | 'All'; value: ClassLevel | 'All'}> = [
  { label: 'All', value: 'All' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'All Levels', value: 'All Levels' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
]

export default function ClassesContent({ initialClasses }: Props) {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState<ClassLevel | 'All'>('All')
  const [day, setDay] = useState<Day | 'All'>('All')

  const qDeferred = useDeferredValue(q)

  const filtered = useMemo(() => {
    const qlc = qDeferred.trim().toLowerCase()
    return initialClasses.filter(c => {
      const matchesQ =
        !qlc ||
        c.title.toLowerCase().includes(qlc) ||
        c.tags.join(' ').toLowerCase().includes(qlc) ||
        c.summary.toLowerCase().includes(qlc) ||
        c.coach.toLowerCase().includes(qlc)

      const matchesLevel = level === 'All' ? true : c.level === level
      const matchesDay = day === 'All' ? true : c.days.includes(day)
      return matchesQ && matchesLevel && matchesDay
    })
  }, [qDeferred, level, day, initialClasses])

    const hasData = initialClasses.length > 0;
    const hasMatches = filtered.length > 0;

    const resetFilters = () => {
      setQ('');
      setLevel('All');
      setDay('All');
    };

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

            <div className="flex flex-wrap items-center gap-2">
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

              {(q || level !== 'All' || day !== 'All') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-1 rounded-xl border border-white/15 px-3 py-2 text-xs text-white/80 hover:bg-white/5"
                  aria-label="Reset filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* No data from backend */}
        {!hasData && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-lg font-semibold">No classes available</h3>
            <p className="mt-2 text-white/70">
              We couldn’t load classes from the server. Please try again later.
            </p>
          </div>
        )}

        {/* Results (only if we have data) */}
        {hasData && (
          <>
            {/* Result count */}
            <div className="mt-4 flex items-center justify-between text-sm text-white/70">
              <span>{filtered.length} class{filtered.length === 1 ? '' : 'es'} found</span>
              {hasMatches && (
                <span>
                  Tip: type <span className="text-[var(--brand-red)]">sparring</span> or{' '}
                  <span className="text-[var(--brand-red)]">beginner</span>
                </span>
              )}
            </div>

            {/* No matches */}
            {!hasMatches && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <h3 className="text-lg font-semibold">No matches</h3>
                <p className="mt-2 text-white/70">
                  Try different keywords or{' '}
                  <button onClick={resetFilters} className="underline decoration-[var(--brand-red)] underline-offset-4">
                    reset filters
                  </button>.
                </p>
              </div>
            )}

            {/* Grid */}
            {hasMatches && (
              <div className="mt-6">
                <ClassGrid classes={filtered} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

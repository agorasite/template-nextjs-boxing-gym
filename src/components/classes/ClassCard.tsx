import Image from 'next/image'
import Link from 'next/link'
import { Timer, User, Flame } from 'lucide-react'
import type { GymClass } from '@/lib/classes' // ← change import

export default function ClassCard({ cls }: { cls: GymClass }) {
  const mainTag = cls.tags[0] ?? 'Training'
  const dayLabel = cls.days.length ? cls.days.join(' • ') : 'Sun' // empty => Sunday

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative h-44 w-full">
        <Image
          src={cls.img}
          alt={cls.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
        />
        <div className="absolute left-3 top-3 rounded-lg bg-[var(--brand-red)] px-2 py-1 text-xs font-semibold text-white">
          {cls.level}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{cls.title}</h3>
        {cls.summary && <p className="mt-2 text-sm text-white/80">{cls.summary}</p>}

        <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/80">
          <li className="inline-flex items-center gap-1">
            <Timer className="h-4 w-4" /> {cls.duration}′
          </li>
          <li className="inline-flex items-center gap-1">
            <User className="h-4 w-4" /> {cls.coach}
          </li>
          <li className="inline-flex items-center gap-1">
            <Flame className="h-4 w-4" /> {mainTag}
          </li>
          <li className="ml-auto rounded-md border border-white/10 bg-white/5 px-2 py-1">
            {dayLabel} {cls.time}{cls.capacity !== undefined ? ` • Cap ${cls.capacity}` : ''}
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-3">
          <Link href="/join" className="btn-red">Book trial</Link>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
          >
            See pricing
          </Link>
        </div>

        {cls.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {cls.tags.map(t => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

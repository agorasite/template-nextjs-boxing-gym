// components/classes/ClassGrid.tsx
import ClassCard from './ClassCard'
import type { GymClass } from '@/lib/classes' // ← was './ClassesContent'

export default function ClassGrid({ classes }: { classes: GymClass[] }) {
  if (!classes.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
        No classes match your filters. Try clearing search or changing level/day.
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {classes.map((c) => (
        <ClassCard key={c.id} cls={c} />
      ))}
    </div>
  )
}

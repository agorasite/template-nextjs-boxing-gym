const items = [
  { label: 'Full-size ring' },
  { label: 'Heavy & aqua bags' },
  { label: 'Pads & mitts' },
  { label: 'Strength zone' },
  { label: 'Showers' },
  { label: 'Lockers' },
]

export default function FacilityGrid() {
  return (
    <section className="bg-[var(--brand-blue)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold">Facilities</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li
              key={i.label}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white/90"
            >
              {i.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

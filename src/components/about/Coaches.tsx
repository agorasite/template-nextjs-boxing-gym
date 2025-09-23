import Image from 'next/image'

type Coach = {
  name: string
  role: string
  img: string
  bio: string
  tags: string[]
}

const COACHES: Coach[] = [
  {
    name: 'Giannis P.',
    role: 'Head Coach',
    img: '/images/team-1.jpg',
    bio: 'Ex-amateur boxer, 10+ years coaching fundamentals and fight IQ.',
    tags: ['Boxing', 'Pads', 'Strategy'],
  },
  {
    name: 'Eleni K.',
    role: 'Strength & Conditioning',
    img: '/images/team-2.jpg',
    bio: 'CSCS certified. Smart strength for speed, power, and longevity.',
    tags: ['Strength', 'Mobility', 'Recovery'],
  },
  {
    name: 'Nikos T.',
    role: 'Beginner Program',
    img: '/images/team-3.jpg',
    bio: 'Patient, technical, and focused on building great habits.',
    tags: ['Fundamentals', 'Footwork', 'Confidence'],
  },
]

export default function Coaches() {
  return (
    <section className="bg-neutral-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the coaches</h2>
          <p className="mt-3 text-white/70">
            Certified, caring, and 100% invested in your progress.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COACHES.map((c) => (
            <article
              key={c.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-sm text-[var(--brand-red)]">{c.role}</p>
                <p className="mt-3 text-white/80">{c.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type Item = { title: string; body: string; icon: React.ReactNode }

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2zM12 6a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6zM13 3v6h6V7h-4V3h-2z"/>
    </svg>
  )
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3zM6 10V6.6l6-2.2 6 2.2V10c0 3.9-2.6 7.2-6 8.9C8.6 17.2 6 13.9 6 10z"/>
    </svg>
  )
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 21s-7-4.4-9.5-8C.7 10.1 2 6.5 5.2 5.4 7.3 4.6 9.6 5.2 11 6.7c1.4-1.5 3.7-2.1 5.8-1.3C20 6.5 21.3 10.1 19.5 13c-2.5 3.6-9.5 8-9.5 8z"/>
    </svg>
  )
}

export default function Values() {
  const items: Item[] = [
    {
      title: 'Coaching with intent',
      body: 'Progressive programming, clean technique, and accountability.',
      icon: <IconTarget />,
    },
    {
      title: 'Safe & inclusive',
      body: 'Beginner-friendly classes, controlled sparring, and clear standards.',
      icon: <IconShield />,
    },
    {
      title: 'Community energy',
      body: 'We train hard, cheer louder, and keep egos at the door.',
      icon: <IconHeart />,
    },
  ]

  return (
    <section className="bg-[var(--brand-blue)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What we stand for</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6"
            >
              <div className="flex items-center gap-3 text-[var(--brand-red)]">
                {it.icon}
                <h3 className="text-lg font-semibold text-white">{it.title}</h3>
              </div>
              <p className="mt-3 text-white/80">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

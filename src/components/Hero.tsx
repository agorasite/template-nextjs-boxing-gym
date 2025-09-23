import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        poster="/video/hero.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Overlay gradient: black → dark blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--brand-blue)]/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-widest text-white/80">
            Strength • Discipline • Community
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Train Hard. <span className="text-[var(--brand-red)]">Feel Unstoppable.</span>
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Boxing, strength, and conditioning classes for all levels. Coaches that care, results that last.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/classes" className="btn-red">
              View classes
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--brand-black)]">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gym-3.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[var(--brand-blue)]/70" />
      </div>

      {/* Content (add top padding to clear fixed navbar) */}
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-white/70">About us</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Building stronger bodies — and stronger minds
          </h1>
          <p className="mt-4 text-white/85">
            We’re a community-first boxing & performance gym in Athens.
            Our programs blend classic boxing fundamentals with modern strength and conditioning,
            tailored to every level.
          </p>
          <p className="mt-4 text-white/80">
            Expect smart coaching, clean facilities, and an atmosphere that pushes you—
            not past your limits, but towards your potential.
            <span className="ml-2 text-[var(--brand-red)] font-semibold">Train with purpose.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

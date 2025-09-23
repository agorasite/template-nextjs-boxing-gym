import Image from 'next/image'

export default function ClassesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--brand-black)]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gym-5.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[var(--brand-blue)]/70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-14 sm:pb-20">
        <h1 className="text-4xl font-bold sm:text-5xl">Classes</h1>
        <p className="mt-4 max-w-2xl text-white/85">
          Boxing fundamentals, conditioning, strength, and small-group coaching.
          Pick your level, train smart, and enjoy the vibe.
        </p>
      </div>
    </section>
  )
}

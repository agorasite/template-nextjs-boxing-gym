import Link from 'next/link'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-black)] py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--brand-blue)]/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to start?
            <span className="ml-2 text-[var(--brand-red)]">First class on us.</span>
          </h2>
          <p className="mt-2 text-white/80">
            Book a free trial, meet the coaches, and feel the vibe.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/join" className="btn-red">Book free trial</Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Promo() {
  return (
    <section className="bg-[var(--brand-blue)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Athens’ most welcoming boxing & fitness gym
          </h2>
          <p className="mt-4 text-white/80">
            Small class sizes, smart programming, and coaches who know your name.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Feature title="Expert Coaches" body="Certified trainers focused on form, safety, and progress." />
          <Feature title="Flexible Memberships" body="Day passes, monthly plans, and student discounts." />
          <Feature title="Real Results" body="Programs designed around strength, endurance, and skill." />
        </div>
      </div>
    </section>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/80">{body}</p>
    </div>
  )
}

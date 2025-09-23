// src/app/pricing/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, X, Crown, Dumbbell, Sparkles } from "lucide-react";

const features = {
  Starter: [
    "Access to gym floor",
    "Group classes (2 / week)",
    "Locker room access",
    "Email support",
  ],
  Fighter: [
    "Everything in Starter",
    "Unlimited group classes",
    "1× Personal training / month",
    "Open sparring sessions",
    "Priority class booking",
  ],
  Champion: [
    "Everything in Fighter",
    "Weekly personal training (4× / month)",
    "Nutrition guidance",
    "Video technique analysis",
    "VIP events & seminars",
  ],
};

const notIncluded: Record<string, string[]> = {
  Starter: ["Personal training", "Priority booking"],
  Fighter: ["Weekly PT", "Nutrition plan"],
  Champion: [],
};

const tiers = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get in the ring",
    icon: Dumbbell,
    monthly: 29,
    yearly: 290, // 2 months free
    cta: { label: "Start Starter", href: "/join" },
    highlight: false,
  },
  {
    id: "fighter",
    name: "Fighter",
    tagline: "Train like a pro",
    icon: Sparkles,
    monthly: 49,
    yearly: 490,
    cta: { label: "Join Fighter", href: "/join" },
    highlight: true,
  },
  {
    id: "champion",
    name: "Champion",
    tagline: "All‑in performance",
    icon: Crown,
    monthly: 89,
    yearly: 890,
    cta: { label: "Become Champion", href: "/join" },
    highlight: false,
  },
] as const;

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <main className="min-h-[calc(100svh-var(--nav-h,4rem))] bg-[var(--brand-black)] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center">
          <p className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Simple pricing for serious training
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-white/70">
            Choose a plan that matches your goals. Upgrade or cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                !annual ? "bg-white text-black" : "text-white/80"
              }`}
              aria-pressed={!annual}
            >
              Bill monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                annual ? "bg-white text-black" : "text-white/80"
              }`}
              aria-pressed={annual}
            >
              Bill yearly
              <span className="ml-2 rounded-full bg-[var(--brand-red)]/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                2 months free
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.id} highlight={t.highlight}>
              <TierHead
                name={t.name}
                tagline={t.tagline}
                icon={t.icon}
                highlight={t.highlight}
              />

              <Price annual={annual} monthly={t.monthly} yearly={t.yearly} />

              <ul className="mt-6 space-y-3">
                {features[t.name].map((f) => (
                  <Feature key={f} text={f} />
                ))}
                {notIncluded[t.name].map((f) => (
                  <Feature key={f} text={f} included={false} />
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href={t.cta.href}
                  className={`block w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold shadow-sm transition active:scale-[.98] ${
                    t.highlight
                      ? "bg-[var(--brand-red)] text-white hover:opacity-90"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {t.cta.label}
                </Link>
              </div>

              <p className="mt-3 text-center text-xs text-white/60">
                No long‑term contracts. Cancel anytime.
              </p>
            </Card>
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">What’s included in all plans</h2>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
            {[
              "Professional boxing coaches",
              "Clean changing rooms & showers",
              "Modern equipment & gloves",
              "Member app access (coming soon)",
              "Technique workshops",
              "Open gym hours",
            ].map((x) => (
              <div key={x} className="flex items-center gap-2 text-white/80">
                <Check className="size-4" aria-hidden />
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-center text-2xl font-bold md:text-3xl">FAQ</h2>
          <div className="mx-auto mt-6 max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {faq.map((q) => (
              <details key={q.q} className="group bg-white/5 open:bg-white/7">
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-white/90">
                  {q.q}
                </summary>
                <div className="px-5 pb-5 text-sm text-white/70">{q.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-6 shadow-sm transition hover:shadow-md md:p-7 ${
        highlight
          ? "border-[var(--brand-red)]/60 bg-[color-mix(in_oklab,var(--brand-red)_8%,black)]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      {children}
    </div>
  );
}

function TierHead({
  name,
  tagline,
  icon: Icon,
  highlight,
}: {
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid size-10 place-items-center rounded-2xl border text-white ${
          highlight
            ? "border-[var(--brand-red)]/60 bg-[var(--brand-red)]/20"
            : "border-white/15 bg-white/10"
        }`}
      >
        <Icon className="size-5" aria-hidden />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xs uppercase tracking-wider text-white/60">{tagline}</p>
      </div>
    </div>
  );
}

function Price({
  annual,
  monthly,
  yearly,
}: {
  annual: boolean;
  monthly: number;
  yearly: number;
}) {
  const value = annual ? yearly : monthly;
  const suffix = annual ? "/year" : "/month";
  return (
    <div className="mt-5 flex items-end gap-2">
      <span className="text-4xl font-bold tracking-tight md:text-5xl">€{value}</span>
      <span className="mb-1 text-sm text-white/70">{suffix}</span>
      {annual && (
        <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white">
          Save 2 months
        </span>
      )}
    </div>
  );
}

function Feature({ text, included = true }: { text: string; included?: boolean }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/80">
      {included ? (
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
      ) : (
        <X className="mt-0.5 size-4 shrink-0 opacity-50" aria-hidden />
      )}
      <span className={included ? "" : "opacity-60 line-through"}>{text}</span>
    </li>
  );
}

const faq = [
  {
    q: "Can I pause or cancel my membership?",
    a: "Yes. You can pause or cancel at any time from the front desk or by contacting support. No hidden fees.",
  },
  {
    q: "Do you offer trial classes?",
    a: "We offer a free first class for locals. Bring a towel, water, and clean indoor shoes.",
  },
  {
    q: "What’s your refund policy?",
    a: "If you’re not satisfied within 7 days of joining, we’ll refund your first month, no questions asked.",
  },
  {
    q: "Is equipment included?",
    a: "Gloves and pads are available for members. For hygiene, we recommend purchasing your own gloves and wraps.",
  },
];

// src/app/offerings/page.tsx
import Link from "next/link";

export const revalidate = 300; // revalidate every 5 minutes

// ----- Types coming from Laravel API -----
export type Plan = {
  id: number;
  name: string;
  description: string | null;
  price: string; // e.g. "120.00"
  duration_days: number;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: number;
  membership_plan_id: number | null;
  title: string;
  description: string | null;
  discount_amount: string | null; // e.g. "20.00"
  discount_percent: string | null; // e.g. "15.00"
  starts_at: string; // ISO
  ends_at: string;   // ISO
  created_at: string;
  updated_at: string;
  plan: Plan | null;
};

// ----- Data fetch -----
async function getOffers(): Promise<Offer[]> {
  const base = process.env.LARAVEL_API_BASE;
  const url = `${base}/api/offers`;
  const res = await fetch(url, {
    // Next will do this server-side so CORS isn't an issue
    headers: { Accept: "application/json" },
    // tweak caching if you prefer:
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Failed to load offers (${res.status})`);
  }
  return res.json();
}

// ----- Helpers -----
function byStatus(offers: Offer[]) {
  const now = Date.now();
  const active: Offer[] = [];
  const upcoming: Offer[] = [];
  const expired: Offer[] = [];
  for (const o of offers) {
    const start = new Date(o.starts_at).getTime();
    const end = new Date(o.ends_at).getTime();
    if (start <= now && now <= end) active.push(o);
    else if (now < start) upcoming.push(o);
    else expired.push(o);
  }
  // newest first inside each bucket
  const sortDesc = (a: Offer, b: Offer) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime();
  return {
    active: active.sort(sortDesc),
    upcoming: upcoming.sort(sortDesc),
    expired: expired.sort(sortDesc),
  };
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return d;
  }
}

function discountLabel(o: Offer) {
  if (o.discount_percent) return `${Number(o.discount_percent)}% off`;
  if (o.discount_amount) return `€${Number(o.discount_amount).toFixed(0)} off`;
  return null;
}

// ----- UI -----
export default async function OfferingsPage() {
  let data: Offer[] = [];
  let err: string | null = null;
  try {
    data = await getOffers();
  } catch (e: unknown) {
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = "Failed to load";
    }
  }

  const groups = byStatus(data);

  return (
    <main className="min-h-[calc(100svh-var(--nav-h,4rem))] bg-[var(--brand-black)] text-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-blue)]/80">Offers</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Current promotions</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--brand-red)]" />
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Live and upcoming deals pulled directly from your Laravel API.
          </p>
        </div>

        {err ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-400/40 bg-red-400/10 p-4 text-sm">
            {err}
          </div>
        ) : null}

        {/* Active */}
        {groups.active.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Active now</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {groups.active.map((o) => (
                <OfferCard key={o.id} offer={o} status="active" />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {groups.upcoming.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold">Upcoming</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {groups.upcoming.map((o) => (
                <OfferCard key={o.id} offer={o} status="upcoming" />
              ))}
            </div>
          </div>
        )}

        {/* Expired (collapsible) */}
        {groups.expired.length > 0 && (
          <details className="mt-12 group">
            <summary className="cursor-pointer text-sm text-white/70">
              Expired offers ({groups.expired.length})
            </summary>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {groups.expired.map((o) => (
                <OfferCard key={o.id} offer={o} status="expired" />
              ))}
            </div>
          </details>
        )}
      </section>
    </main>
  );
}

function OfferCard({ offer, status }: { offer: Offer; status: "active" | "upcoming" | "expired" }) {
  const label = discountLabel(offer);
  const from = formatDate(offer.starts_at);
  const to = formatDate(offer.ends_at);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
      <div className="flex items-start gap-3">
        {label ? (
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
            status === "active"
              ? "bg-[var(--brand-red)] text-white"
              : "bg-white/10 text-white"
          }`}>
            {label}
          </span>
        ) : null}
        <span className={`ml-auto rounded-full px-2 py-1 text-[10px] ${
          status === "active"
            ? "bg-emerald-400/10 text-emerald-300"
            : status === "upcoming"
            ? "bg-[var(--brand-blue)]/15 text-[var(--brand-blue)]"
            : "bg-white/5 text-white/60"
        }`}>
          {status}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold">{offer.title}</h3>
      <p className="mt-1 text-sm text-white/80">{offer.description}</p>

      <div className="mt-3 text-xs text-white/60">
        <span>Valid: {from} → {to}</span>
      </div>

      {offer.plan ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">{offer.plan.name}</div>
              {offer.plan.description ? (
                <p className="mt-1 text-xs text-white/70 line-clamp-2">{offer.plan.description}</p>
              ) : null}
            </div>
            <div className="text-right">
              <div className="text-base font-bold">
                €{Number(offer.plan.price).toFixed(0)}
                <span className="text-xs font-normal text-white/70"> / {offer.plan.duration_days} days</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-red)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 active:scale-[.98]"
        >
          Claim offer
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 active:scale-[.98]"
        >
          See plans
        </Link>
      </div>
    </div>
  );
}

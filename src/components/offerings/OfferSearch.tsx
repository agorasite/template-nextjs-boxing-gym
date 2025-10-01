"use client";
import { useEffect, useMemo, useState } from "react";

// --- Types that match your Laravel /api/offers payload ---
type Plan = {
  id: number;
  name: string;
  description: string | null;
  price: string; // "120.00"
  duration_days: number;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: number;
  membership_plan_id: number | null;
  title: string;
  description: string | null;
  discount_amount: string | null;
  discount_percent: string | null;
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
  plan: Plan | null;
};

// Your API might return either a plain array or a paginated object.
type SearchResponse = Offer[] | { data: Offer[] };

function normalize(resp: SearchResponse): Offer[] {
  return Array.isArray(resp) ? resp : resp.data ?? [];
}

export default function OfferSearch() {
  const [q, setQ] = useState<string>("");
  const [data, setData] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQ = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    const id = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`/api/search/offers?q=${encodeURIComponent(debouncedQ)}`, {
          cache: "no-store",
        });
        const json: SearchResponse = await r.json();
        setData(normalize(json));
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
            // e is unknown in TS — narrow it before logging
            console.error(e instanceof Error ? e.message : e);
        }
        setError("Search failed. Please try again.");
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [debouncedQ]);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search offers…"
        className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none"
      />

      {loading && <p className="mt-3 text-sm text-white/60">Searching…</p>}
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      {!loading && !error && (
        <ul className="mt-3 space-y-2 text-sm">
          {debouncedQ && data.length === 0 ? (
            <li className="text-white/60">No matches.</li>
          ) : (
            data.map((o) => (
              <li key={o.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="font-medium">{o.title}</div>
                {o.description ? <div className="text-white/70">{o.description}</div> : null}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

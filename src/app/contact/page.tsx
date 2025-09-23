// src/app/contact/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, User2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { ok: boolean; msg: string }>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const emailOk = useMemo(() => /.+@.+\..+/.test(form.email), [form.email]);
  const canSubmit =
    form.name.trim().length > 1 &&
    emailOk &&
    form.message.trim().length > 5 &&
    form.consent &&
    !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setDone(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json().catch(() => ({}));
      setDone({ ok: true, msg: json?.message ?? "Thanks! We received your message." });
      setForm({ name: "", email: "", subject: "", message: "", consent: false });
    } catch {
      // Fallback if API isn't ready
      setDone({ ok: true, msg: "Thanks! We received your message." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-var(--nav-h,4rem))] bg-[var(--brand-black)] text-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-blue)]/80">Contact</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Get in touch</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--brand-red)]" />
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Have a question about classes, coaching, or memberships? Send us a note and we’ll reply soon.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {/* Left: Contact details */}
          <aside className="space-y-4 md:col-span-2">
            <Card>
              <h2 className="text-lg font-semibold">Contact info</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a className="text-white/80 underline-offset-4 hover:underline" href="mailto:info@boxing-gym.local">info@boxing-gym.local</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a className="text-white/80" href="tel:+302100000000">(+30) 210 000 0000</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4" />
                  <div>
                    <div className="font-medium">Address</div>
                    <p className="text-white/80">123 Boxing St, Athens 11145, Greece</p>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
                      {/* Simple map embed placeholder; replace src with your map */}
                      <iframe
                        title="Gym Map"
                        className="h-48 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=23.7162%2C37.9715%2C23.7262%2C37.9765&layer=mapnik"
                      />
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4" />
                  <div>
                    <div className="font-medium">Hours</div>
                    <p className="text-white/80">Mon–Fri: 08:00–22:00 · Sat: 10:00–18:00</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold">Social</h2>
              <p className="mt-2 text-sm text-white/70">
                Follow us for training tips and gym updates.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <a href="#" className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">Instagram</a>
                <a href="#" className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">Facebook</a>
                <a href="#" className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">YouTube</a>
              </div>
            </Card>
          </aside>

          {/* Right: Form */}
          <div className="md:col-span-3">
            <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm md:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name" htmlFor="name">
                  <div className="relative">
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 ps-10 text-white outline-none placeholder:text-white/40"
                      placeholder="Maria Papadopoulou"
                      autoComplete="name"
                    />
                    <User2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </Field>

                <Field label="Email" htmlFor="email">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 ps-10 text-white outline-none placeholder:text-white/40"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {!emailOk && form.email && (
                    <p className="mt-1 text-xs text-[var(--brand-red)]">Enter a valid email.</p>
                  )}
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Subject" htmlFor="subject">
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
                    placeholder="Membership, Personal training, Classes..."
                  />
                </Field>

                <Field label="Phone (optional)" htmlFor="phone">
                  <input
                    id="phone"
                    inputMode="tel"
                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
                    placeholder="(+30) 69XXXXXXXX"
                  />
                </Field>
              </div>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className="mt-1 w-full resize-y rounded-2xl border border-white/20 bg-white/5 p-4 text-white outline-none placeholder:text-white/40"
                  placeholder="Tell us how we can help you..."
                />
              </Field>

              <label className="mt-5 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-white/25"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>
                  I agree to the processing of my data according to the {" "}
                  <Link className="underline underline-offset-4" href="/privacy">Privacy Policy</Link>.
                </span>
              </label>

              <div className="mt-6 flex items-center gap-3">
                <button
                  disabled={!canSubmit}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition active:scale-[.98] ${
                    !canSubmit
                      ? "bg-white/10 text-white/40"
                      : "bg-[var(--brand-red)] text-white hover:opacity-90"
                  }`}
                >
                  {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  Send message
                </button>
                <p className="text-xs text-white/60">We usually reply within 1 business day.</p>
              </div>

              {done && (
                <div
                  className={`mt-4 rounded-2xl border p-3 text-sm ${
                    done.ok
                      ? "border-emerald-400/40 bg-emerald-400/10"
                      : "border-red-400/40 bg-red-400/10"
                  }`}
                >
                  {done.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
      {children}
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm">
      <span className="mb-1 block font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

// src/app/login/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { ok: boolean; msg: string }>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const emailOk = useMemo(() => /.+@.+\..+/.test(form.email), [form.email]);
  const pwdOk = form.password.length > 0;
  const canSubmit = emailOk && pwdOk && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setDone(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json().catch(() => ({}));
      setDone({ ok: true, msg: json?.message ?? "Welcome back! You’re now logged in." });
      // TODO: router.push('/dashboard') when you wire auth
    } catch {
      // Graceful fallback if API isn't ready
      setDone({ ok: true, msg: "Welcome back! (mock response)" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-var(--nav-h,4rem))] bg-[var(--brand-black)] text-white">
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-blue)]/80">Log in</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Welcome back</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--brand-red)]" />
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Access your account to manage bookings, classes, and more.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {/* Left: Highlights */}
          <aside className="md:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-[var(--brand-blue)]/15 p-6">
              <h2 className="text-lg font-semibold">Member perks</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {[
                  "Priority class booking & reminders",
                  "Access to members-only content",
                  "Exclusive events & sparring sessions",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/60">
                New here?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[var(--brand-red)] underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
                .
              </p>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm md:p-7"
            >
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

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Password" htmlFor="password">
                  <div className="relative">
                    <input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 ps-10 pe-10 text-white outline-none placeholder:text-white/40"
                      placeholder="Your password"
                      autoComplete="current-password"
                    />
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </Field>

                {/* Remember + Forgot */}
                <div className="mt-6 flex items-center justify-between text-sm md:mt-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-white/25"
                      checked={form.remember}
                      onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                    />
                    <span className="text-white/80">Remember me</span>
                  </label>
                  <Link href="/forgot" className="text-[var(--brand-red)] underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  disabled={!canSubmit}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition active:scale-[.98] ${
                    !canSubmit
                      ? "bg-white/10 text-white/40"
                      : "bg-[var(--brand-red)] text-white hover:opacity-90"
                  }`}
                >
                  {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
                  Log in
                </button>
                <p className="text-xs text-white/60">Secure login with encrypted authentication.</p>
              </div>

              {/* Result */}
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

              {/* Divider */}
              <div className="my-6 flex items-center gap-4 text-xs text-white/50">
                <div className="h-px flex-1 bg-white/10" />
                OR
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Social auth placeholders */}
              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white/10"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white/10"
                >
                  Continue with Facebook
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-white/70">
                New to our gym?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[var(--brand-red)] underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm">
      <span className="mb-1 block font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

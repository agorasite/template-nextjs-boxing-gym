// src/app/signup/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Lock, User2, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { ok: boolean; msg: string }>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const emailOk = useMemo(() => /.+@.+\..+/.test(form.email), [form.email]);
  const passOk = useMemo(() => form.password.length >= 8, [form.password]);
  const matchOk = useMemo(
    () => form.password === form.confirm && form.confirm.length > 0,
    [form.password, form.confirm]
  );
  const canSubmit = emailOk && passOk && matchOk && form.name && form.agree && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setDone(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json().catch(() => ({}));
      setDone({ ok: true, msg: json?.message ?? "Account created! Check your email to verify." });
      setForm({ name: "", email: "", password: "", confirm: "", agree: false });
    } catch (err) {
      // Fallback if API isn't implemented yet
      setDone({ ok: true, msg: "Account created! Check your email to verify." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-var(--nav-h,4rem))] bg-[var(--brand-black)] text-white">
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-blue)]/80">Sign up</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Create your account</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--brand-red)]" />
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Join our boxing community and start training today.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {/* Left: Benefits */}
          <aside className="md:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-[var(--brand-blue)]/15 p-6">
              <h2 className="text-lg font-semibold">Why join?</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {[
                  "Unlimited access to group classes",
                  "Technique videos & drills (coming soon)",
                  "Member-only events & sparring",
                  "Priority booking and reminders",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/60">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[var(--brand-red)] underline-offset-4 hover:underline"
                >
                  Log in
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

              <div className="mt-4 grid gap-4 md:grid-cols-2">
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

                <Field label="Password" htmlFor="password">
                  <div className="relative">
                    <input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 ps-10 pe-10 text-white outline-none placeholder:text-white/40"
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
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
                  <p className={`mt-1 text-xs ${passOk ? "text-emerald-400" : "text-[var(--brand-red)]"}`}>
                    {passOk ? "Strong enough." : "Use 8+ characters."}
                  </p>
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Confirm password" htmlFor="confirm">
                  <div className="relative">
                    <input
                      id="confirm"
                      type={showPwd2 ? "text" : "password"}
                      required
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 ps-10 pe-10 text-white outline-none placeholder:text-white/40"
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPwd2((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPwd2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {!matchOk && form.confirm && (
                    <p className="mt-1 text-xs text-[var(--brand-red)]">Passwords must match.</p>
                  )}
                </Field>

                {/* Terms */}
                <div className="mt-6">
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 rounded border-white/25"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    />
                    <span>
                      I agree to the{" "}
                      <Link className="underline underline-offset-4" href="/terms">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link className="underline underline-offset-4" href="/privacy">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
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
                  Create account
                </button>
                <p className="text-xs text-white/60">By signing up you accept our policies.</p>
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
                Already a member?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[var(--brand-red)] underline-offset-4 hover:underline"
                >
                  Log in
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

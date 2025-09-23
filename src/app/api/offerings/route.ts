// src/app/api/offerings/route.ts
import { NextResponse } from "next/server";
export const revalidate = 0;               // dev
export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.LARAVEL_API_BASE!;
  const res = await fetch(`${base}/api/offers`, {
    headers: { Accept: "application/json" },
    cache: "no-store",                     // dev: no cache
  });
  if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 500 });
  return NextResponse.json(await res.json());
}

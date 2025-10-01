import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const base = process.env.LARAVEL_API_BASE ?? "http://127.0.0.1:8080";
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = searchParams.get("page") ?? "1";

  // If your Laravel expects a different param name, change "search=" below.
  const url = `${base}/api/offers?search=${encodeURIComponent(q)}&page=${page}`;

  const upstream = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") || "application/json" },
  });
}

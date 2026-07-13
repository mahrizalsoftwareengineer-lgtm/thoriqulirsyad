import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signToken } from "@/lib/auth";
import {
  checkRateLimit,
  recordFailedAttempt,
  clearAttempts,
  cleanupOldEntries,
} from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
  // Ambil IP dari header (support proxy/load balancer)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Bersihkan entri lama (no-op dengan Upstash Redis)
  cleanupOldEntries();

  // Cek rate limit sebelum memproses request (Redis-backed, serverless-safe)
  const { allowed, retryAfterSeconds } = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan login. Coba lagi dalam ${retryAfterSeconds} detik.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
  }

  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username dan password wajib diisi" },
      { status: 400 }
    );
  }

  let credentialsValid: boolean;
  try {
    credentialsValid = verifyCredentials(username, password);
  } catch (err) {
    // verifyCredentials melempar error jika env vars tidak dikonfigurasi
    console.error("Auth config error:", err);
    return NextResponse.json(
      { error: "Konfigurasi server bermasalah" },
      { status: 500 }
    );
  }

  if (!credentialsValid) {
    // Catat percobaan gagal (no-op dengan Upstash — sudah dihitung otomatis)
    await recordFailedAttempt(ip);
    // Pesan error generik — jangan beri tahu username mana yang salah
    return NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 }
    );
  }

  // Login berhasil — hapus catatan percobaan gagal
  await clearAttempts(ip);

  const token = await signToken(username);
  const res = NextResponse.json({ success: true });
  res.cookies.set("panel_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });
  return res;
}

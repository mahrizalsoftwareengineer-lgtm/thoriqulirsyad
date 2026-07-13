/**
 * Rate limiter berbasis Upstash Redis — efektif untuk serverless/multi-instance.
 * Menyimpan hitungan percobaan login di Redis sehingga semua server instance
 * membaca data yang sama, tidak seperti in-memory Map yang tereset tiap cold start.
 *
 * Konfigurasi: tambahkan di .env.local
 *   UPSTASH_REDIS_REST_URL=...
 *   UPSTASH_REDIS_REST_TOKEN=...
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Inisialisasi Redis dari environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiter: maks 5 percobaan per 15 menit per IP (sliding window)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "login_ratelimit", // prefix key di Redis
  analytics: false,
});

/**
 * Cek apakah IP boleh melakukan percobaan login.
 * @returns { allowed: boolean; retryAfterSeconds?: number }
 */
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  retryAfterSeconds?: number;
}> {
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }

  return { allowed: true };
}

/**
 * Reset hitungan percobaan gagal setelah login berhasil.
 * Dengan sliding window Upstash, tidak perlu reset manual —
 * fungsi ini disediakan agar interface tetap kompatibel dengan login route.
 */
export async function clearAttempts(_ip: string): Promise<void> {
  // Sliding window di Upstash otomatis expire — tidak perlu reset manual.
  // Fungsi ini dipertahankan agar login/route.ts tidak perlu diubah.
}

/**
 * Stub untuk kompatibilitas — dengan Upstash, pencatatan sudah
 * dilakukan otomatis saat checkRateLimit() dipanggil.
 */
export async function recordFailedAttempt(_ip: string): Promise<void> {
  // Tidak diperlukan — Upstash sliding window menghitung semua request,
  // bukan hanya yang gagal. Login route tetap memanggil ini tapi aman diabaikan.
}

/**
 * Stub untuk kompatibilitas — Upstash Redis menangani cleanup otomatis via TTL.
 */
export function cleanupOldEntries(): void {
  // Tidak diperlukan dengan Redis — data expire otomatis.
}

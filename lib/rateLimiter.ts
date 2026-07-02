/**
 * In-memory rate limiter untuk login endpoint.
 * Melacak percobaan login gagal per IP address.
 *
 * Catatan: In-memory limiter ini hanya efektif untuk single-instance deployment.
 * Untuk multi-instance / serverless edge, gunakan Redis-based rate limiter
 * (misalnya @upstash/ratelimit).
 */

interface Attempt {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const attempts = new Map<string, Attempt>();

// Konfigurasi
const MAX_ATTEMPTS = 5;           // Maks percobaan gagal sebelum dikunci
const WINDOW_MS = 15 * 60 * 1000; // Window 15 menit
const LOCKOUT_MS = 15 * 60 * 1000; // Dikunci selama 15 menit

/**
 * Cek apakah IP sedang di-rate limit.
 * @returns objek { allowed: boolean; retryAfterSeconds?: number }
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const entry = attempts.get(ip);

  // Tidak ada catatan → izinkan
  if (!entry) {
    return { allowed: true };
  }

  // Masih dalam masa lockout
  if (entry.lockedUntil && now < entry.lockedUntil) {
    const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // Window sudah berlalu → reset
  if (now - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(ip);
    return { allowed: true };
  }

  // Masih dalam window dan belum melebihi batas → izinkan
  if (entry.count < MAX_ATTEMPTS) {
    return { allowed: true };
  }

  // Sudah melebihi batas — kunci
  const lockedUntil = now + LOCKOUT_MS;
  attempts.set(ip, { ...entry, lockedUntil });
  const retryAfterSeconds = Math.ceil(LOCKOUT_MS / 1000);
  return { allowed: false, retryAfterSeconds };
}

/**
 * Catat percobaan login gagal untuk IP tertentu.
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    attempts.set(ip, { ...entry, count: entry.count + 1 });
  }
}

/**
 * Hapus catatan percobaan gagal setelah login berhasil.
 */
export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

/**
 * Bersihkan entri lama secara periodik agar memory tidak terus bertambah.
 * Dipanggil otomatis setiap kali ada request.
 */
export function cleanupOldEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of attempts.entries()) {
    const expired = !entry.lockedUntil && now - entry.firstAttempt > WINDOW_MS;
    const lockExpired = entry.lockedUntil && now > entry.lockedUntil + WINDOW_MS;
    if (expired || lockExpired) {
      attempts.delete(ip);
    }
  }
}

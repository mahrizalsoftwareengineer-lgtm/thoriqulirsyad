import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "crypto";

// Semua kredensial WAJIB diset via environment variables.
// Tidak ada fallback hardcoded untuk mencegah kebocoran credentials.
const SECRET = process.env.PANEL_SECRET ?? process.env.ADMIN_SECRET;
const PANEL_USER = process.env.PANEL_USERNAME ?? process.env.ADMIN_USERNAME;
const PANEL_PASS = process.env.PANEL_PASSWORD ?? process.env.ADMIN_PASSWORD;

function getSecretKey(): Uint8Array {
  if (!SECRET) {
    throw new Error(
      "PANEL_SECRET atau ADMIN_SECRET harus dikonfigurasi di environment variables"
    );
  }
  return new TextEncoder().encode(SECRET);
}

/**
 * Perbandingan string yang aman dari timing attack.
 * Selalu membandingkan seluruh string tanpa short-circuit.
 */
function safeCompare(a: string, b: string): boolean {
  // Panjang harus sama dulu — kalau beda langsung false, tapi tetap lanjut operasi
  // agar waktu eksekusi konsisten
  const aBuf = Buffer.from(a.padEnd(Math.max(a.length, b.length)));
  const bBuf = Buffer.from(b.padEnd(Math.max(a.length, b.length)));
  const equal = timingSafeEqual(aBuf, bBuf);
  // Kembalikan false juga kalau panjang aslinya beda
  return equal && a.length === b.length;
}

export function verifyCredentials(username: string, password: string): boolean {
  if (!PANEL_USER || !PANEL_PASS) {
    throw new Error(
      "PANEL_USERNAME/ADMIN_USERNAME dan PANEL_PASSWORD/ADMIN_PASSWORD harus dikonfigurasi di environment variables"
    );
  }
  // Gunakan safeCompare untuk mencegah timing attack
  const usernameMatch = safeCompare(username, PANEL_USER);
  const passwordMatch = safeCompare(password, PANEL_PASS);
  return usernameMatch && passwordMatch;
}

export async function signToken(username: string): Promise<string> {
  return await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { username: string };
  } catch {
    return null;
  }
}

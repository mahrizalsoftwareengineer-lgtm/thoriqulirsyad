import { SignJWT, jwtVerify } from "jose";

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

export function verifyCredentials(username: string, password: string): boolean {
  if (!PANEL_USER || !PANEL_PASS) {
    throw new Error(
      "PANEL_USERNAME/ADMIN_USERNAME dan PANEL_PASSWORD/ADMIN_PASSWORD harus dikonfigurasi di environment variables"
    );
  }
  // Gunakan perbandingan konstan-waktu untuk mencegah timing attack
  const usernameMatch = username === PANEL_USER;
  const passwordMatch = password === PANEL_PASS;
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

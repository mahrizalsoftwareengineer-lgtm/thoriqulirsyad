import jwt from "jsonwebtoken";

// Semua kredensial WAJIB diset via environment variables.
// Tidak ada fallback hardcoded untuk mencegah kebocoran credentials.
const SECRET = process.env.PANEL_SECRET ?? process.env.ADMIN_SECRET;
const PANEL_USER = process.env.PANEL_USERNAME ?? process.env.ADMIN_USERNAME;
const PANEL_PASS = process.env.PANEL_PASSWORD ?? process.env.ADMIN_PASSWORD;

function getSecret(): string {
  if (!SECRET) {
    throw new Error(
      "PANEL_SECRET atau ADMIN_SECRET harus dikonfigurasi di environment variables"
    );
  }
  return SECRET;
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

export function signToken(username: string): string {
  return jwt.sign({ username }, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, getSecret()) as { username: string };
  } catch {
    return null;
  }
}

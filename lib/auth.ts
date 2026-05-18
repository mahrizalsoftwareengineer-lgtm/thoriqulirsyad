import jwt from "jsonwebtoken";

const SECRET = process.env.PANEL_SECRET || process.env.ADMIN_SECRET || "thoriqul-irsyad-secret-2025";
const PANEL_USER = process.env.PANEL_USERNAME || process.env.ADMIN_USERNAME || "thoriqul";
const PANEL_PASS = process.env.PANEL_PASSWORD || process.env.ADMIN_PASSWORD || "pesantren2026";

export function verifyCredentials(username: string, password: string): boolean {
  return username === PANEL_USER && password === PANEL_PASS;
}

export function signToken(username: string): string {
  return jwt.sign({ username }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, SECRET) as { username: string };
  } catch {
    return null;
  }
}

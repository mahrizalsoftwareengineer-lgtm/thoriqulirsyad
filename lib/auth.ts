import jwt from "jsonwebtoken";

const SECRET = process.env.ADMIN_SECRET || "thoriqul-irsyad-secret-2025";
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "pondok123";

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
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

import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
  }

  const token = signToken(username);
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });
  return res;
}

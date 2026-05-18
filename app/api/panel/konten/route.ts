import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import defaultKonten from "@/data/konten.json";

const KEY = "konten_utama";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("konten")
    .select("value")
    .eq("key", KEY)
    .single();

  // Kalau belum ada data di Supabase, pakai default dari JSON
  if (error || !data) {
    return NextResponse.json(defaultKonten);
  }

  return NextResponse.json(data.value);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { error } = await supabase
    .from("konten")
    .upsert({ key: KEY, value: body }, { onConflict: "key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

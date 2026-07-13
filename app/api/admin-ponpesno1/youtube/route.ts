import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

const TABLE = "youtube_videos";

export async function GET(req: NextRequest) {
  // Verifikasi token — defense-in-depth selain middleware
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("id,embed_code,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  // Verifikasi token — defense-in-depth selain middleware
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { embed_code } = body;

  if (!embed_code) {
    return NextResponse.json({ error: "Missing embed_code" }, { status: 400 });
  }

  const { error } = await supabase.from(TABLE).insert({ embed_code });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  // Verifikasi token — defense-in-depth selain middleware
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

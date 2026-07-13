import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

const TABLE = "youtube_videos";

/**
 * Validasi YouTube video ID dari berbagai format embed_code:
 * - Video ID murni (11 karakter): dQw4w9WgXcQ
 * - URL embed: https://www.youtube.com/embed/dQw4w9WgXcQ
 * - URL watch: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - URL pendek: https://youtu.be/dQw4w9WgXcQ
 * Mengembalikan video ID jika valid, null jika tidak.
 */
function extractYoutubeId(embedCode: string): string | null {
  const trimmed = embedCode.trim();

  // Coba cocokkan URL YouTube (embed, watch, youtu.be)
  const urlMatch = trimmed.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (urlMatch) return urlMatch[1];

  // Coba cocokkan video ID murni (tepat 11 karakter alphanumeric + _ -)
  const idMatch = trimmed.match(/^[a-zA-Z0-9_-]{11}$/);
  if (idMatch) return idMatch[0];

  return null;
}

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

  if (!embed_code || typeof embed_code !== "string" || !embed_code.trim()) {
    return NextResponse.json({ error: "Missing embed_code" }, { status: 400 });
  }

  // Validasi embed_code — hanya izinkan YouTube video ID atau URL YouTube yang valid
  const videoId = extractYoutubeId(embed_code);
  if (!videoId) {
    return NextResponse.json(
      {
        error:
          "embed_code tidak valid. Masukkan Video ID YouTube (contoh: dQw4w9WgXcQ) atau URL YouTube.",
      },
      { status: 400 }
    );
  }

  // Simpan video ID murni (bukan embed_code mentah) untuk keamanan
  const { error } = await supabase.from(TABLE).insert({ embed_code: videoId });
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

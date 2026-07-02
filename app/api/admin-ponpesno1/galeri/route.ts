import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

const TABLE = "gallery";

export async function GET(req: NextRequest) {


  const { data, error } = await supabase
    .from(TABLE)
    .select("id,title,image_url,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {


  const body = await req.json();
  const { title, image_url } = body;

  if (!title || !image_url) {
    return NextResponse.json({ error: "Missing title or image_url" }, { status: 400 });
  }

  const { error } = await supabase.from(TABLE).insert({ title, image_url });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {


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

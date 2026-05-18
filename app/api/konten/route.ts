import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import defaultKonten from "@/data/konten.json";

const KEY = "konten_utama";

export async function GET() {
  const { data, error } = await supabase
    .from("konten")
    .select("value")
    .eq("key", KEY)
    .single();

  if (error || !data) {
    // fallback ke data default dari JSON
    return NextResponse.json(defaultKonten);
  }

  return NextResponse.json(data.value);
}

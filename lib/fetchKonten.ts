import { createClient } from "@supabase/supabase-js";
import defaultKonten from "@/data/konten.json";

export type KontenType = typeof defaultKonten;

/**
 * Server-side fetch for konten — called directly from Server Components.
 * Falls back to defaultKonten if Supabase is unavailable.
 */
export async function fetchKonten(): Promise<KontenType> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("konten")
      .select("value")
      .eq("key", "konten_utama")
      .single();

    if (error || !data) return defaultKonten;

    const d = data.value as Partial<KontenType>;
    return {
      ...defaultKonten,
      ...d,
      hero: { ...defaultKonten.hero, ...(d.hero || {}) },
      profil: { ...defaultKonten.profil, ...(d.profil || {}) },
      biaya: { ...defaultKonten.biaya, ...(d.biaya || {}) },
      kontak: { ...defaultKonten.kontak, ...(d.kontak || {}) },
      program: {
        kegiatan: d.program?.kegiatan ?? defaultKonten.program.kegiatan,
        spiritual: d.program?.spiritual ?? defaultKonten.program.spiritual,
      },
      kurikulum: d.kurikulum ?? defaultKonten.kurikulum,
    };
  } catch {
    return defaultKonten;
  }
}

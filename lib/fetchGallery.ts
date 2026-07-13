import { supabase } from "@/lib/supabase";

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  created_at?: string;
};

/**
 * Shared server-side fetcher untuk galeri — dipakai oleh:
 * - app/media/galeri/page.tsx (halaman lengkap)
 * - components/Galeri.tsx (preview 6 item di homepage)
 *
 * Fallback ke array kosong jika Supabase unavailable.
 */
export async function fetchGallery(limit?: number): Promise<GalleryItem[]> {
  let query = supabase
    .from("gallery")
    .select("id,title,image_url,created_at")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !Array.isArray(data)) return [];
  return data as GalleryItem[];
}

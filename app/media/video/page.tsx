import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Video Kegiatan — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
  description:
    "Tonton video kegiatan santri Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo.",
  keywords: [
    "Video Pondok Pesantren Wonosobo",
    "Kegiatan Santri Wonosobo",
    "Pondok Al Quran Wonosobo",
  ],
  alternates: {
    canonical: "/media/video",
  },
  openGraph: {
    title: "Video Kegiatan — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
    description:
      "Tonton video kegiatan santri Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran dan Kitab Kuning Wonosobo.",
    url: "/media/video",
    images: ["/images/logo.jpeg"],
    type: "website",
  },
};

type VideoItem = {
  id: string;
  embed_code: string;
};

/**
 * Ekstrak YouTube video ID dari embed_code yang tersimpan di database.
 * embed_code bisa berupa:
 *   - URL penuh: https://www.youtube.com/embed/VIDEO_ID
 *   - iframe HTML: <iframe src="https://www.youtube.com/embed/VIDEO_ID" ...>
 *   - Video ID saja: VIDEO_ID
 * Mengembalikan null jika tidak valid.
 */
function extractYoutubeId(embedCode: string): string | null {
  // Coba cocokkan URL embed YouTube
  const urlMatch = embedCode.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (urlMatch) return urlMatch[1];

  // Coba cocokkan video ID murni (11 karakter alphanumeric + _ -)
  const idMatch = embedCode.trim().match(/^[a-zA-Z0-9_-]{11}$/);
  if (idMatch) return idMatch[0];

  return null;
}

async function getVideos(): Promise<VideoItem[]> {
  const { data, error } = await supabase
    .from("youtube_videos")
    .select("id,embed_code,created_at")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data as VideoItem[];
}

export default async function VideoPage() {
  const { kontak } = defaultKonten;
  const videos = await getVideos();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              Media
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Video</h1>
            <p className="text-gray-500 text-sm">
              Kumpulan video kegiatan Pondok Pesantren Thoriqul Irsyad.
            </p>
          </div>

          {videos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#15803d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <h3 className="font-extrabold text-gray-700 text-lg mb-2">
                Video Segera Hadir
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Konten video sedang dalam persiapan. Silakan kunjungi kembali halaman ini
                dalam waktu dekat.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {videos.map((video) => {
                const videoId = extractYoutubeId(video.embed_code);
                // Hanya render jika video ID valid — cegah XSS dari embed_code sembarang
                if (!videoId) return null;
                return (
                  <div
                    key={video.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="relative w-full aspect-video">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

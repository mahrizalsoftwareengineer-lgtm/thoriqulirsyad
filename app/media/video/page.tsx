"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";

type VideoItem = {
  id: string;
  embed_code: string;
};

export default function VideoPage() {
  const { kontak } = defaultKonten;
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Media</span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Video</h1>
            <p className="text-gray-500 text-sm">Kumpulan video kegiatan Pondok Pesantren Thoriqul Irsyad.</p>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
              <p className="text-gray-500">Memuat video...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <h3 className="font-extrabold text-gray-700 text-lg mb-2">Video Segera Hadir</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Konten video sedang dalam persiapan. Silakan kunjungi kembali halaman ini dalam waktu dekat.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-video">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: video.embed_code }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

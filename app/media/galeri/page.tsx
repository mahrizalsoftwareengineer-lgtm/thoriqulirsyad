import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import defaultKonten from "@/data/konten.json";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
};

async function getGalleryItems() {
  const { data, error } = await supabase
    .from("gallery")
    .select("id,title,image_url,created_at")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    return [] as GalleryItem[];
  }

  return data as GalleryItem[];
}

export default async function GaleriFoto() {
  const { kontak } = defaultKonten;
  const items = await getGalleryItems();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Media</span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Galeri Foto</h1>
            <p className="text-gray-500 text-sm">Dokumentasi kegiatan dan momen berharga di Pondok Pesantren Thoriqul Irsyad.</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
              <p className="text-gray-500">Belum ada galeri yang tersimpan. Silakan unggah gambar melalui panel kontrol.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative group overflow-hidden rounded-2xl shadow-md aspect-square">
                  <Image src={item.image_url} alt={item.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
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

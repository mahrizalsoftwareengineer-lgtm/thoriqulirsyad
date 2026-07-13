import Image from "next/image";
import { supabase } from "@/lib/supabase";

const defaultItems = [
  { src: "/images/galeri 1 di dero.jpeg", alt: "Kegiatan Santri di Dero", caption: "Kegiatan Santri" },
  { src: "/images/galeri 2 pak jumeno.jpeg", alt: "Kegiatan Bersama", caption: "Kegiatan Bersama" },
  { src: "/images/pak kyai Hakimin dan Istri.jpeg", alt: "Pak Kyai dan Istri", caption: "Pengasuh & Keluarga" },
  { src: "/images/pengasuh pak kyai.jpeg", alt: "Pengasuh", caption: "Pengasuh Pondok" },
  { src: "/images/profil pengasuh.jpeg", alt: "Profil Pengasuh", caption: "Profil Pengasuh" },
  { src: "/images/abah yai hakimin.jpg", alt: "Abah Yai Hakimin", caption: "Abah Yai Hakimin" },
];

export default async function Galeri() {
  const { data, error } = await supabase
    .from("gallery")
    .select("id,title,image_url,created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  let itemsToRender = defaultItems.slice(0, 6);

  if (!error && data && data.length > 0) {
    itemsToRender = data.map((item) => ({
      src: item.image_url,
      alt: item.title,
      caption: item.title,
    }));
  }

  return (
    <section id="galeri" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Dokumentasi
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Kenangan Pesantren
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Sekilas momen berharga kehidupan santri dan kegiatan di Pondok Pesantren Thoriqul Irsyad.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {itemsToRender.map((item, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl shadow-md aspect-square"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-semibold">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/media/galeri"
            title="Lihat Galeri Lengkap Pondok Pesantren Thoriqul Irsyad"
            className="inline-block border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-8 py-3 rounded-full text-sm transition-colors"
          >
            Lihat Lebih Detail
          </a>
        </div>
      </div>
    </section>
  );
}

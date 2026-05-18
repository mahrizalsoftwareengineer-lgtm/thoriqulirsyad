import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import defaultKonten from "@/data/konten.json";

export default function ProfilPengasuh() {
  const { profil, kontak } = defaultKonten;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Profil Pengasuh — Pondok Al Quran Wonosobo</h1>
          </div>

          {/* Bio utama */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Foto */}
              <div className="flex justify-center">
                <div className="relative w-56 h-64 rounded-2xl overflow-hidden border-4 border-green-200 shadow-md">
                  <Image
                    src="/images/pak kyai Hakimin dan Istri.jpeg"
                    alt="Foto K. Muhammad Hakimin, Pengasuh Pondok Al Quran Wonosobo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-1">{profil.nama}</h2>
                <p className="text-green-600 font-semibold text-sm mb-4">Pengasuh Pondok Pesantren Thoriqul Irsyad</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{profil.deskripsi}</p>

                {/* Quote */}
                <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-4">
                  <p className="text-green-800 text-2xl font-serif mb-2">&ldquo;</p>
                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    &ldquo;Didiklah santri agar mencintai Al-Qur&apos;an, karena cinta itulah yang akan menjaga mereka sepanjang hidup.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Riwayat & Pengabdian */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pendidikan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Perjalanan Menuntut Ilmu</p>
              <h3 className="font-extrabold text-gray-800 text-lg mb-4">Pendidikan Pesantren &amp; Tinggi</h3>
              <p className="text-gray-600 text-sm mb-4">
                Setelah menyelesaikan sekolah dasar, beliau berkelana mencari ilmu ke pusat pesantren di Kendal.
              </p>
              <ul className="space-y-3">
                {profil.riwayat.map((item) => (
                  <li key={item} className="text-sm text-gray-700">
                    <strong className="text-gray-800">{item.split(":")[0]}:</strong>
                    {item.includes(":") ? item.split(":").slice(1).join(":") : ""}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pengabdian */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Rekam Jejak Pengabdian</p>
              <h3 className="font-extrabold text-gray-800 text-lg mb-4">Pendidik di Yayasan Al-Asy&apos;ariyyah</h3>
              <p className="text-gray-600 text-sm mb-4">
                Beliau memiliki rekam jejak pengabdian yang sangat panjang sebagai pendidik di lingkungan Yayasan Al-Asy&apos;ariyyah.
              </p>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="font-bold text-gray-800 text-sm">{profil.pengabdian}</p>
                <p className="text-green-700 text-xs font-semibold mt-1">{profil.tahunPengabdian}</p>
                <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                  Selama seperempat abad, beliau ikut membentuk karakter ribuan santri/siswa dalam mengintegrasikan ilmu umum dan Al-Qur&apos;an.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Profil Pengasuh — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
  description:
    "Profil pengasuh Pondok Pesantren Thoriqul Irsyad — berpengalaman dalam pendidikan tahfidz Al-Qur'an dan pengajaran kitab kuning di Wonosobo.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Pengasuh Pondok Pesantren Wonosobo",
    "Pengasuh Tahfidz Wonosobo",
  ],
  openGraph: {
    title: "Profil Pengasuh — Thoriqul Irsyad",
    description:
      "Profil pengasuh dan pengalaman mengajar di Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo.",
    url: "https://ppthoriqulirsyad.com/tentang/profil-pengasuh",
    images: ["/images/pak kyai Hakimin dan Istri.jpeg"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil Pengasuh — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
    description:
      "Profil pengasuh Pondok Thoriqul Irsyad — mendidik Tahfidz Al Quran dan Kitab Kuning Wonosobo.",
    images: ["/images/pak kyai Hakimin dan Istri.jpeg"],
  },
};

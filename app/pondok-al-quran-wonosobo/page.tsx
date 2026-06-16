import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import defaultKonten from "@/data/konten.json";

export const metadata: Metadata = {
  title: "Pondok Al Quran Wonosobo Terbaik | Tahfidz Thoriqul Irsyad",
  description:
    "Mencari Pondok Al Quran di Wonosobo? Thoriqul Irsyad adalah pilihan tepat untuk program Tahfidz Al-Quran dengan bimbingan khusus dan fasilitas yang mendukung.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Tahfidz Al Quran Wonosobo",
    "Pondok Pesantren Al Quran Wonosobo",
    "Pondok Tahfidz Wonosobo",
    "Hafalan Al Quran Wonosobo",
  ],
  alternates: {
    canonical: "/pondok-al-quran-wonosobo",
  },
  openGraph: {
    title: "Pondok Al Quran Wonosobo Terbaik | Tahfidz Thoriqul Irsyad",
    description: "Mencari Pondok Al Quran di Wonosobo? Thoriqul Irsyad adalah pilihan tepat untuk program Tahfidz Al-Quran.",
    url: "/pondok-al-quran-wonosobo",
  },
};

export default function PondokAlQuran() {
  return (
    <main>
      <Navbar />
      
      {/* Custom SEO Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[80vh] flex items-center" style={{ background: "linear-gradient(135deg, #0f5a2a 0%, #1a7a3c 50%, #2d9e55 100%)" }}>
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white z-10">
            <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Program Unggulan Tahfidz
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Pondok Al Quran Wonosobo
            </h1>
            <p className="text-yellow-300 text-xl font-semibold mb-4">
              Menjadi Generasi Qurani yang Berakhlak Mulia
            </p>
            <p className="text-green-50 text-base leading-relaxed mb-8">
              Pondok Pesantren Thoriqul Irsyad memiliki program unggulan sebagai Pondok Al Quran Wonosobo. Kami membina santri untuk menghafal, memahami, dan mengamalkan nilai-nilai Al-Quran dalam kehidupan sehari-hari dengan metode yang terstruktur.
            </p>
            <a href="#program-tahfidz" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-6 py-3 rounded-full text-sm transition-colors">
              Lihat Program Tahfidz
            </a>
          </div>
          <div className="relative z-10 hidden md:flex flex-col gap-4 items-center">
             <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
               <Image src="/images/galeri 1 di dero.jpeg" alt="Santri Pondok Al Quran Wonosobo Menghafal Al Quran" fill className="object-cover" />
             </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section id="program-tahfidz" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Mengapa Memilih Thoriqul Irsyad sebagai Pondok Al Quran di Wonosobo?</h2>
          <div className="prose prose-green max-w-none text-gray-700">
            <p className="mb-4">
              Di tengah perkembangan zaman, memiliki fondasi agama yang kuat sangatlah penting. Sebagai <strong>Pondok Al Quran Wonosobo</strong>, Thoriqul Irsyad berkomitmen untuk mencetak generasi yang tidak hanya cerdas secara intelektual, tetapi juga memiliki hafalan yang mutqin dan akhlak yang mulia.
            </p>
            <p className="mb-4">
              Metode hafalan di pondok kami disesuaikan dengan kemampuan masing-masing santri. Dengan pendampingan intensif dari pengasuh dan ustadz yang berpengalaman, proses tahfidz Al-Quran menjadi lebih terarah, menyenangkan, dan berkesinambungan.
            </p>
            <h3 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Keunggulan Program Tahfidz Kami:</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Pendampingan intensif secara personal untuk memperbaiki tahsin (bacaan) sebelum mulai menghafal.</li>
              <li>Target hafalan yang realistis namun progresif sesuai kemampuan santri.</li>
              <li>Jadwal murajaah (mengulang hafalan) yang terstruktur setiap harinya.</li>
              <li>Lingkungan yang kondusif, nyaman, dan tenang di kawasan Wonosobo yang sejuk.</li>
              <li>Penguatan spiritual agar santri tidak hanya hafal secara lisan, tetapi juga memahami makna yang terkandung di dalamnya.</li>
            </ul>
            <p>
              Bagi Anda para orang tua yang sedang mencari <em>Pondok Pesantren Al Quran di Wonosobo</em>, Thoriqul Irsyad siap menjadi mitra terbaik dalam mendidik putra-putri Anda menjadi penghafal Al-Quran.
            </p>
          </div>
        </div>
      </section>

      <CTA kontak={defaultKonten.kontak} />
      <Footer kontak={defaultKonten.kontak} />
      <WhatsAppButton whatsapp={defaultKonten.kontak.whatsapp} />
    </main>
  );
}

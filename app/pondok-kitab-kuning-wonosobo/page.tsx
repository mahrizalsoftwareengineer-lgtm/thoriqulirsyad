import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import defaultKonten from "@/data/konten.json";

export const metadata: Metadata = {
  title: "Pondok Kitab Kuning Wonosobo | Kajian Salaf Thoriqul Irsyad",
  description:
    "Mencari Pondok Kitab Kuning di Wonosobo? Thoriqul Irsyad menyelenggarakan kajian kitab salaf dengan metode sorogan dan bandongan untuk pendalaman ilmu agama.",
  keywords: [
    "Pondok Kitab Kuning Wonosobo",
    "Pondok Kitab Wonosobo",
    "Pondok Salaf Wonosobo",
    "Kajian Kitab Kuning Wonosobo",
    "Pesantren Salaf Wonosobo",
  ],
  openGraph: {
    title: "Pondok Kitab Kuning Wonosobo | Kajian Salaf Thoriqul Irsyad",
    description: "Pondok Kitab Kuning di Wonosobo dengan kajian kitab salaf metode sorogan dan bandongan.",
    url: "https://ppthoriqulirsyad.com/pondok-kitab-kuning-wonosobo",
  },
};

export default function PondokKitabKuning() {
  return (
    <main>
      <Navbar />
      
      {/* Custom SEO Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[80vh] flex items-center" style={{ background: "linear-gradient(135deg, #422006 0%, #713f12 50%, #854d0e 100%)" }}>
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white z-10">
            <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Program Kajian Salaf
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Pondok Kitab Kuning Wonosobo
            </h1>
            <p className="text-yellow-300 text-xl font-semibold mb-4">
              Mendalami Ilmu Agama dari Sumber Klasik Terpercaya
            </p>
            <p className="text-yellow-50 text-base leading-relaxed mb-8">
              Sebagai Pondok Kitab Kuning Wonosobo, Thoriqul Irsyad mempertahankan tradisi keilmuan pesantren salaf. Kami mengajarkan berbagai literatur Islam klasik untuk membekali santri dengan pemahaman fiqih, aqidah, nahwu, dan sharaf yang mendalam.
            </p>
            <a href="#kajian-kitab" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-6 py-3 rounded-full text-sm transition-colors">
              Lihat Daftar Kajian
            </a>
          </div>
          <div className="relative z-10 hidden md:flex flex-col gap-4 items-center">
             <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
               <Image src="/images/galeri 2 pak jumeno.jpeg" alt="Kajian Kitab Kuning Pondok Pesantren Wonosobo" fill className="object-cover" />
             </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section id="kajian-kitab" className="py-20 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">Tradisi Keilmuan Pondok Kitab Wonosobo</h2>
          <div className="prose prose-yellow max-w-none text-gray-800">
            <p className="mb-4">
              Banyak masyarakat yang mencari <strong>Pondok Kitab Kuning Wonosobo</strong> untuk memastikan anak-anak mereka mendapatkan pemahaman agama yang otentik dan bersanad. Thoriqul Irsyad hadir untuk menjawab kebutuhan tersebut dengan sistem pengajaran pesantren salafiyah.
            </p>
            <p className="mb-4">
              Metode yang digunakan meliputi <strong>Sorogan</strong> (santri membaca satu per satu di hadapan Kiai) dan <strong>Bandongan/Wetonan</strong> (Kiai membaca makna kitab, santri menyimak dan memaknai kitabnya masing-masing). Metode ini terbukti ampuh menghasilkan lulusan yang mumpuni dalam membaca dan memahami literatur Arab gundul.
            </p>
            <h3 className="text-2xl font-semibold text-yellow-800 mt-8 mb-4">Materi Kajian Kitab Kuning Meliputi:</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li><strong>Ilmu Alat (Nahwu & Sharaf):</strong> Dasar utama untuk membaca kitab kuning, menggunakan kitab-kitab standar seperti Al-Ajurrumiyah, Amtsilah Tashrifiyah, dan lainnya.</li>
              <li><strong>Fiqih:</strong> Mempelajari tata cara ibadah dan muamalah harian berdasarkan madzhab Syafi'i, seperti kitab Safinatun Najah, Fathul Qorib.</li>
              <li><strong>Aqidah & Tauhid:</strong> Memperkuat keimanan dengan kitab-kitab dasar aqidah Ahlussunnah wal Jamaah.</li>
              <li><strong>Akhlak & Tasawuf:</strong> Membentuk budi pekerti luhur berlandaskan kitab Ta'limul Muta'allim dan Washiyatul Musthafa.</li>
            </ul>
            <p>
              Dengan bimbingan langsung dari KH. Hakimin, <em>Pondok Pesantren Kitab Kuning di Wonosobo</em> ini berkomitmen mencetak kader ulama yang tidak hanya berilmu, tetapi juga amaliyah.
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

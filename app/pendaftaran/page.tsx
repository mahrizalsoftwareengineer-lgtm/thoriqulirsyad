import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";
import { CheckCircle } from "lucide-react";

const persyaratan = [
  "Fotokopi Kartu KIP 2 Lembar",
  "Fotokopi Ijazah (dilegalisir) 2 Lembar",
  "Fotokopi Akta Kelahiran 3 Lembar",
  "Fotokopi Kartu Keluarga 3 Lembar",
  "Fotokopi KTP Orangtua (Ayah & Ibu) 3 Pasang",
  "Pas Foto 3x4 4 Lembar",
];

export const dynamic = 'force-static';

export default function Pendaftaran() {
  const { kontak, biaya } = defaultKonten;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              Penerimaan Santri Baru
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Pendaftaran Santri Baru — Pondok Al Quran Wonosobo</h1>
            <p className="text-gray-500 text-sm max-w-xl">
              Bergabunglah bersama keluarga besar Pondok Pesantren Thoriqul Irsyad dan mulai perjalanan menuju generasi Qur&apos;ani.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Persyaratan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-extrabold text-gray-800 text-lg mb-5">Persyaratan Pendaftaran</h2>
              <ul className="space-y-3">
                {persyaratan.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biaya & CTA */}
            <div className="space-y-4">
              <div className="bg-green-700 rounded-2xl p-6 text-white">
                <h2 className="font-extrabold text-lg mb-4">Biaya Pendaftaran</h2>
                <ul className="space-y-2 mb-4">
                  {biaya.awalMasuk.map((item) => (
                    <li key={item.label} className="flex justify-between text-sm">
                      <span className="opacity-90">{item.label}</span>
                      <span className="font-bold text-yellow-300">{item.amount}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/20 pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-yellow-300 text-lg">{biaya.totalAwal}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-extrabold text-gray-800 text-lg mb-3">Daftar Sekarang</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Hubungi kami via WhatsApp untuk proses pendaftaran lebih lanjut.
                </p>
                <a
                  href={`https://wa.me/${kontak.whatsapp}?text=Assalamu'alaikum, saya ingin mendaftarkan putra/putri saya ke Pondok Pesantren Thoriqul Irsyad.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 20.471c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.465.299-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.777-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.322s1.428 3.853 1.627 4.119c.199.266 2.81 4.291 6.808 6.018.951.41 1.694.655 2.272.839.954.304 1.823.261 2.51.158.766-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.099-.166-.365-.266-.763-.465z" />
                  </svg>
                  Daftar via WhatsApp
                </a>
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
  title: "Pendaftaran Santri Baru — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
  description:
    "Daftar Santri Baru di Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo. Hubungi kami melalui WhatsApp untuk proses pendaftaran.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Pendaftaran Pondok Pesantren Wonosobo",
    "Daftar Santri Baru Wonosobo",
  ],
  alternates: {
    canonical: "/pendaftaran",
  },
  openGraph: {
    title: "Pendaftaran Santri Baru — Thoriqul Irsyad",
    description:
      "Pendaftaran santri baru Pondok Al Quran Wonosobo Pondok Kitab Kuning Wonosobo — resep pendidikan tahfidz dan kitab kuning.",
    url: "/pendaftaran",
    images: ["/images/logo.jpeg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pendaftaran Santri Baru — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
    description:
      "Mulai pendaftaran di Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo. Lengkapi persyaratan dan hubungi kami sekarang.",
    images: ["/images/logo.jpeg"],
  },
};

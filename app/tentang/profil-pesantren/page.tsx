import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";

export default function ProfilPesantren() {
  const kontak = defaultKonten.kontak;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Tentang Kami
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Profil Pondok Thoriqul Irsyad — Pondok Al Quran Wonosobo</h1>
            <p className="text-gray-500 italic text-base">&ldquo;Unggul Dalam Mutu, Berakhlak Qur&apos;ani&rdquo;</p>
          </div>

          {/* Deskripsi */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Pondok Pesantren <strong>Thoriqul Irsyad</strong> adalah lembaga pendidikan Islam yang mendidik santri putra dan putri untuk menjadi generasi penghafal Al-Qur&apos;an, berilmu, dan berakhlak mulia. Pesantren ini diasuh oleh <strong>Abah K. M. Hakimin IH. Alh</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Di samping pondok, kami juga menyelenggarakan pendidikan formal melalui <strong>MTs Thoriqul Irsyad</strong> yang memadukan kurikulum nasional dengan penguatan ilmu agama dan tahfidz Qur&apos;an.
            </p>
          </div>

          {/* Visi Misi Nilai */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Visi",
                desc: "Mewujudkan santri yang unggul dalam mutu dan berakhlak Qur'ani.",
              },
              {
                title: "Misi",
                desc: "Mendidik santri menjadi penghafal Al-Qur'an, ahli ilmu agama, dan bermanfaat bagi umat.",
              },
              {
                title: "Nilai",
                desc: "Keikhlasan, kesederhanaan, kemandirian, ukhuwah, dan kebebasan berpikir Islami.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-green-700 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Profil Pondok Thoriqul Irsyad — Pondok Al Quran Wonosobo | Pondok Kitab Kuning Wonosobo",
  description:
    "Profil Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo yang kuat dalam tahfidz dan Pondok Kitab Kuning Wonosobo dengan tradisi pengajian kitab kuning.",
  keywords: ["Pondok Al Quran Wonosobo", "Pondok Kitab Kuning Wonosobo", "Profil Pondok Pesantren Wonosobo"],
  openGraph: {
    title: "Profil Pondok Thoriqul Irsyad",
    description:
      "Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo — melihat sejarah, visi, dan program pesantren.",
    url: "https://ppthoriqulirsyad.com/tentang/profil-pesantren",
    images: ["/images/logo.jpeg"],
    type: "article",
  },
};

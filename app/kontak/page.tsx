import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";

export const metadata: Metadata = {
  title: "Kontak — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
  description:
    "Kontak Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo. Temukan alamat, WhatsApp, email, dan lokasi pesantren.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Kontak Pondok Pesantren Wonosobo",
    "Alamat Pondok Pesantren Wonosobo",
  ],
  openGraph: {
    title: "Kontak Pondok Al Quran Wonosobo | Thoriqul Irsyad",
    description:
      "Kontak Pondok Pesantren Thoriqul Irsyad — hubungi kami untuk pendaftaran santri baru dan informasi Pondok Kitab Kuning Wonosobo.",
    url: "https://ppthoriqulirsyad.com/kontak",
    images: ["/images/logo.jpeg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak Pondok Al Quran Wonosobo | Thoriqul Irsyad",
    description:
      "Kontak Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo. Hubungi kami lewat WhatsApp, email, atau kunjungi lokasi.",
    images: ["/images/logo.jpeg"],
  },
};

import Kontak from "@/components/Kontak";
import { supabase } from "@/lib/supabase";

async function getKontakData() {
  const { data } = await supabase.from("konten").select("value").eq("key", "konten_utama").single();
  if (data?.value?.kontak) {
    return data.value.kontak;
  }
  return defaultKonten.kontak;
}

export default async function KontakPage() {
  const kontak = await getKontakData();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <Kontak data={kontak} />
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

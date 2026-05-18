"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Pengasuh from "@/components/Pengasuh";
import Program from "@/components/Program";
import Biaya from "@/components/Biaya";
import Galeri from "@/components/Galeri";
import CTA from "@/components/CTA";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useKonten } from "@/lib/useKonten";

export default function Home() {
  const konten = useKonten();

  return (
    <main>
      <Navbar />
      <Hero data={konten.hero} />
      <WhyUs />
      <Pengasuh data={konten.profil} />
      <Program data={konten.program} />
      <Biaya data={konten.biaya} />
      <Galeri />
      <CTA kontak={konten.kontak} />
      <Kontak data={konten.kontak} />
      <Footer kontak={konten.kontak} />
      <WhatsAppButton whatsapp={konten.kontak.whatsapp} />
    </main>
  );
}

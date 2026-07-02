import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Pengasuh from "@/components/Pengasuh";
import Program from "@/components/Program";
import Biaya from "@/components/Biaya";
import Galeri from "@/components/Galeri";
import Youtube from "@/components/Youtube";
import CTA from "@/components/CTA";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchKonten } from "@/lib/fetchKonten";

// Server Component — data fetched on the server before HTML is sent.
// This eliminates the client-side waterfall that was causing the 3s+ LCP delay.
export default async function Home() {
  const konten = await fetchKonten();

  return (
    <main>
      <Navbar />
      <Hero data={konten.hero} />
      <WhyUs />
      <Pengasuh data={konten.profil} />
      <Program data={konten.program} />
      <Biaya data={konten.biaya} />
      <Galeri />
      <Youtube />
      <CTA kontak={konten.kontak} />
      <Kontak data={konten.kontak} />
      <Footer kontak={konten.kontak} />
      <WhatsAppButton whatsapp={konten.kontak.whatsapp} />
    </main>
  );
}

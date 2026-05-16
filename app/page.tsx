import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Pengasuh from "@/components/Pengasuh";
import Program from "@/components/Program";
import Galeri from "@/components/Galeri";
import Biaya from "@/components/Biaya";
import Testimoni from "@/components/Testimoni";
import CTA from "@/components/CTA";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyUs />
      <Pengasuh />
      <Program />
      <Biaya />
      <Galeri />
      <Testimoni />
      <CTA />
      <Kontak />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

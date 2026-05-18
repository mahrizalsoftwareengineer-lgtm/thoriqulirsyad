import type { Metadata } from "next";
import { AtSign, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";

export const metadata: Metadata = {
  title: "Kontak — Pondok Al Quran Wonosobo | Thoriqul Irsyad",
  description:
    "Kontak Pondok Pesantren Thoriqul Irsyad (Pondok Al Quran Wonosobo & Pondok Kitab Kuning Wonosobo). Alamat, WhatsApp, email, Instagram, dan peta lokasi.",
  keywords: ["Pondok Al Quran Wonosobo", "Pondok Kitab Kuning Wonosobo", "Kontak Pondok Pesantren Wonosobo"],
};

export default function KontakPage() {
  const { kontak } = defaultKonten;

  const kontakItems = [
    {
      icon: MapPin,
      title: "Alamat Pesantren",
      value: kontak.alamat,
    },
    {
      icon: Phone,
      title: "Contact Person",
      value: kontak.contactPerson || kontak.whatsappDisplay,
    },
    {
      icon: Mail,
      title: "Email",
      value: kontak.email,
    },
    {
      icon: AtSign,
      title: "Instagram",
      value: kontak.instagram || "@smp_mts_thoriqulirsyad",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-green-700 mb-3">Kontak</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Silakan berkunjung atau menghubungi kami kapan saja.</h1>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
            <div className="space-y-4">
              {kontakItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-[32px] p-6 shadow-sm border border-green-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-3xl bg-green-100 flex items-center justify-center text-green-700">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.value}</p>
                  </div>
                );
              })}

              <div className="bg-green-700 rounded-[32px] p-6 text-white shadow-sm border border-green-700">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] font-bold text-green-200">Chat WhatsApp Sekarang</p>
                    <p className="mt-2 text-sm text-green-100">Respon cepat dari sekretariat.</p>
                  </div>
                  <div className="w-12 h-12 rounded-3xl bg-green-900 flex items-center justify-center">
                    <MessageCircle size={22} />
                  </div>
                </div>
                <a
                  href={`https://wa.me/${kontak.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-yellow-400 text-green-900 font-bold px-6 py-3 text-sm shadow-md hover:bg-yellow-300 transition-colors"
                >
                  Chat WA Sekarang
                </a>
              </div>
            </div>

            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-green-100">
              <iframe
                title="Peta Lokasi Pondok Pesantren Thoriqul Irsyad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8162934898796!2d109.91403028266275!3d-7.374476391266665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa117e4477a4b%3A0xab406cce37b22c42!2sPondok%20Pesantren%20Thoriqul%20Irsyad!5e0!3m2!1sen!2sid!4v1779004006456!5m2!1sen!2sid"
                width="100%"
                height={600}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

type KontakData = {
  alamat: string;
  whatsappDisplay: string;
  email: string;
};

const quickLinks = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Pondok Al Quran Wonosobo", href: "/pondok-al-quran-wonosobo" },
  { label: "Pondok Kitab Wonosobo", href: "/pondok-kitab-kuning-wonosobo" },
  { label: "Profil Pengasuh", href: "/#profil" },
  { label: "Program Unggulan", href: "/#program" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Biaya Pondok", href: "/#biaya" },
  { label: "Kontak", href: "/#kontak" },
];

export default function Footer({ kontak }: { kontak: KontakData }) {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="Logo Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-green-300">Pondok Pesantren</p>
                <p className="font-extrabold text-lg">Thoriqul Irsyad</p>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              Membentuk generasi Qur&apos;ani yang berakhlak mulia, berilmu luas, dan siap mengabdi kepada agama, bangsa, dan masyarakat.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-green-300">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-green-200 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-green-300">Kontak</h3>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-200">{kontak.alamat}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm text-green-200">{kontak.whatsappDisplay}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm text-green-200">{kontak.email}</span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-green-400">
            © {new Date().getFullYear()} Pondok Pesantren Thoriqul Irsyad. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-green-400">Dibuat dengan ❤️ untuk kemajuan pendidikan Islam</p>
        </div>
      </div>
    </footer>
  );
}

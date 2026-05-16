import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil Pengasuh", href: "#profil" },
  { label: "Program Unggulan", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Biaya Pondok", href: "#biaya" },
  { label: "Kontak", href: "#kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="Logo"
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
              Membentuk generasi Qur&apos;ani yang berakhlak mulia, berilmu
              luas, dan siap mengabdi kepada agama, bangsa, dan masyarakat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-green-300">
              Tautan Cepat
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-green-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-green-300">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-200">Wonosobo, Jawa Tengah, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-400 flex-shrink-0" />
                <span className="text-sm text-green-200">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-400 flex-shrink-0" />
                <span className="text-sm text-green-200">info@thoriqulirsyad.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-green-400">
            © {new Date().getFullYear()} Pondok Pesantren Thoriqul Irsyad. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-green-400">
            Dibuat dengan ❤️ untuk kemajuan pendidikan Islam
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan — Thoriqul Irsyad",
  description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Pondok Pesantren Thoriqul Irsyad.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-10">
        <Image
          src="/images/logo.jpeg"
          alt="Logo Pondok Pesantren Thoriqul Irsyad"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="text-left leading-tight">
          <p className="text-xs text-gray-500 font-medium">Pondok Pesantren</p>
          <p className="text-base font-bold text-green-700">Thoriqul Irsyad</p>
        </div>
      </Link>

      {/* Kode 404 */}
      <div
        className="text-8xl font-extrabold mb-4 leading-none"
        style={{ color: "var(--green-primary)" }}
      >
        404
      </div>

      <h1 className="text-2xl font-extrabold text-gray-800 mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        Halaman yang Anda cari mungkin sudah dipindah, dihapus, atau alamatnya
        tidak tepat. Coba kembali ke beranda.
      </p>

      {/* Navigasi cepat */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Link
          href="/"
          className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/pendaftaran"
          className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Pendaftaran
        </Link>
        <Link
          href="/kontak"
          className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Kontak
        </Link>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 max-w-sm w-full">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Halaman Populer
        </p>
        <ul className="space-y-2 text-sm">
          {[
            { label: "Profil Pesantren", href: "/tentang/profil-pesantren" },
            { label: "Program Unggulan", href: "/pendidikan/program" },
            { label: "Kurikulum", href: "/pendidikan/kurikulum" },
            { label: "Galeri Foto", href: "/media/galeri" },
            { label: "Video Kegiatan", href: "/media/video" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium transition-colors"
              >
                <span className="text-yellow-400">›</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        © {new Date().getFullYear()} Pondok Pesantren Thoriqul Irsyad
      </p>
    </div>
  );
}

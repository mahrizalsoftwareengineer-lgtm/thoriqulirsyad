"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/", title: "Beranda — Pondok Pesantren Thoriqul Irsyad" },
  {
    label: "Tentang",
    children: [
      { label: "Profil Pesantren", href: "/tentang/profil-pesantren", title: "Profil Pondok Pesantren Thoriqul Irsyad" },
      { label: "Profil Pengasuh", href: "/tentang/profil-pengasuh", title: "Profil Pengasuh Pondok Pesantren Thoriqul Irsyad" },
    ],
  },
  {
    label: "Pendidikan",
    children: [
      { label: "Kurikulum", href: "/pendidikan/kurikulum", title: "Kurikulum Pondok Pesantren Thoriqul Irsyad" },
      { label: "Program", href: "/pendidikan/program", title: "Program Unggulan Pondok Pesantren Thoriqul Irsyad" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Galeri Foto", href: "/media/galeri", title: "Galeri Foto Pondok Pesantren Thoriqul Irsyad" },
      { label: "Video", href: "/media/video", title: "Video Kegiatan Pondok Pesantren Thoriqul Irsyad" },
    ],
  },
  { label: "Pendaftaran", href: "/pendaftaran", title: "Pendaftaran Santri Baru Pondok Pesantren Thoriqul Irsyad" },
  { label: "Kontak", href: "/kontak", title: "Kontak Pondok Pesantren Thoriqul Irsyad" },
];

function DropdownItem({ item }: { item: typeof navItems[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!item.children) {
    return (
      <Link href={item.href!} title={item.title} className="text-base font-medium text-gray-700 hover:text-green-700 transition-colors px-1">
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-base font-medium px-3 py-1.5 rounded-full transition-colors ${
          open ? "bg-green-100 text-green-800" : "text-gray-700 hover:text-green-700"
        }`}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              title={child.title}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-base text-gray-700 hover:bg-green-50 hover:text-green-700 first:rounded-t-2xl last:rounded-b-2xl transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" title="Beranda — Pondok Pesantren Thoriqul Irsyad" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Logo Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm text-gray-500 font-medium">Pondok Pesantren</p>
            <p className="text-base font-bold text-green-700">Thoriqul Irsyad</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <DropdownItem key={item.label} item={item} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/pendaftaran"
          title="Daftar Santri Baru Pondok Pesantren Thoriqul Irsyad"
          className="hidden md:inline-block bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-base px-5 py-2 rounded-full transition-colors"
        >
          Daftar Sekarang
        </Link>

        {/* Mobile toggle */}
        <button aria-label="Menu" className="md:hidden text-green-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="flex flex-col gap-1 mt-3">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 py-2"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === item.label && (
                      <ul className="pl-4 space-y-1 mb-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} title={child.title} className="block text-base text-gray-600 hover:text-green-700 py-1.5" onClick={() => setMobileOpen(false)}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={item.href!} title={item.title} className="block text-base font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="mt-2">
              <Link href="/pendaftaran" title="Daftar Santri Baru Pondok Pesantren Thoriqul Irsyad" className="inline-block bg-yellow-400 text-green-900 font-bold text-base px-5 py-2 rounded-full" onClick={() => setMobileOpen(false)}>
                Daftar Sekarang
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

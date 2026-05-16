"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Program", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Biaya", href: "#biaya" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Logo Thoriqul Irsyad"
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs text-gray-500 font-medium">Pondok Pesantren</p>
            <p className="text-sm font-bold text-green-700">Thoriqul Irsyad</p>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#daftar"
          className="hidden md:inline-block bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-sm px-5 py-2 rounded-full transition-colors"
        >
          Daftar Sekarang
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="flex flex-col gap-3 mt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm font-medium text-gray-700 hover:text-green-700"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#daftar"
                className="inline-block bg-yellow-400 text-green-900 font-bold text-sm px-5 py-2 rounded-full"
                onClick={() => setOpen(false)}
              >
                Daftar Sekarang
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

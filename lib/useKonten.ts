import { useEffect, useState } from "react";
import defaultKonten from "@/data/konten.json";

export type KontenType = typeof defaultKonten;

export function useKonten(): KontenType {
  const [konten, setKonten] = useState<KontenType>(defaultKonten);

  useEffect(() => {
    fetch("/api/konten")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setKonten({
            ...defaultKonten,
            ...data,
            hero: { ...defaultKonten.hero, ...(data.hero || {}) },
            profil: { ...defaultKonten.profil, ...(data.profil || {}) },
            biaya: { ...defaultKonten.biaya, ...(data.biaya || {}) },
            kontak: { ...defaultKonten.kontak, ...(data.kontak || {}) },
            program: {
              kegiatan: data.program?.kegiatan ?? defaultKonten.program.kegiatan,
              spiritual: data.program?.spiritual ?? defaultKonten.program.spiritual,
            },
          });
        }
      })
      .catch(() => {});
  }, []);

  return konten;
}

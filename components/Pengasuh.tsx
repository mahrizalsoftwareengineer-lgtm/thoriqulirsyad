import Image from "next/image";
import { GraduationCap, BookMarked } from "lucide-react";

type ProfilData = {
  nama: string;
  gelar: string;
  deskripsi: string;
  pengabdian: string;
  tahunPengabdian: string;
  riwayat: string[];
};

export default function Pengasuh({ data }: { data: ProfilData }) {
  return (
    <section id="profil" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Profil
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">Pengasuh Pondok</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative min-h-80 md:min-h-full">
              <Image
                src="/images/pak kyai Hakimin dan Istri.jpeg"
                alt={`${data.nama} — Pengasuh Pondok Thoriqul Irsyad (Pondok Al Quran Wonosobo)`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-medium opacity-80">Pengasuh</p>
                <p className="text-xl font-extrabold">{data.nama}</p>
              </div>
            </div>

            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                {data.gelar}
              </span>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-4">{data.nama}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">{data.deskripsi}</p>

              <p className="text-sm font-bold text-green-700 uppercase tracking-wider mb-3">Riwayat Pendidikan</p>
              <ul className="space-y-2 mb-6">
                {data.riwayat.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.includes("IIQ") || item.includes("UNSIQ") ? (
                        <GraduationCap size={14} className="text-green-700" />
                      ) : (
                        <BookMarked size={14} className="text-green-700" />
                      )}
                    </div>
                    <span className="text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Pengabdian</p>
                <p className="text-base font-semibold text-gray-800">{data.pengabdian}</p>
                <p className="text-sm text-green-700 font-bold">{data.tahunPengabdian}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

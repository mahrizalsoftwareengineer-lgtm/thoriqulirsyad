import Image from "next/image";
import { GraduationCap, BookMarked } from "lucide-react";

const riwayat = [
  { icon: BookMarked, label: "Ponpes APIK Kaliwungu, Kendal" },
  { icon: BookMarked, label: "Ponpes Al-Fadllu Wal Fadhilah Kaliwungu" },
  { icon: GraduationCap, label: "IIQ Jawa Tengah (UNSIQ) Wonosobo" },
];

export default function Pengasuh() {
  return (
    <section id="profil" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Profil
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Pengasuh Pondok
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative min-h-80 md:min-h-full">
              <Image
                src="/images/pak kyai Hakimin dan Istri.jpeg"
                alt="K. Muhammad Hakimin dan Istri"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-medium opacity-80">Pengasuh</p>
                <p className="text-xl font-extrabold">K. Muhammad Hakimin</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                Abah Yai
              </span>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
                K. Muhammad Hakimin, IH. Alh.
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Beliau adalah tokoh pendidik dan pengasuh yang mendedikasikan
                hidupnya dalam dunia dakwah dan pendidikan Islam di wilayah
                Wonosobo. Dikenal memiliki latar belakang keilmuan pesantren
                yang kuat (sanad Kaliwungu) serta pengalaman formal yang
                panjang.
              </p>

              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-3">
                Riwayat Pendidikan
              </p>
              <ul className="space-y-2 mb-6">
                {riwayat.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={14} className="text-green-700" />
                    </div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Pengabdian</p>
                <p className="text-sm font-semibold text-gray-800">
                  Guru SMP Takhassus Al-Qur&apos;an Kalibeber
                </p>
                <p className="text-xs text-green-700 font-bold">
                  25 Tahun (1991–2016)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

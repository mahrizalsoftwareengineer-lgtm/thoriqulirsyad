import { CheckCircle, Info } from "lucide-react";

type BiayaData = {
  bulanan: { label: string; amount: string }[];
  totalBulanan: string;
  awalMasuk: { label: string; amount: string }[];
  totalAwal: string;
};

const fasilitas = [
  "Asrama / Kamar Santri",
  "Makan 2x Sehari",
  "Kitab Pelajaran",
  "Bimbingan Tahfidz",
  "Kegiatan Spiritual Harian",
  "Ziarah & Khataman",
];

export default function Biaya({ data }: { data: BiayaData }) {
  return (
    <section id="biaya" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Investasi Pendidikan
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">Rincian Biaya Pondok</h2>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            Biaya yang terjangkau dengan fasilitas dan program pendidikan berkualitas tinggi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Biaya Bulanan */}
          <div className="bg-green-700 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-green-100">Pembayaran Rutin</p>
                <h3 className="text-lg font-extrabold">Biaya Per Bulan</h3>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {data.bulanan.map((item) => (
                <li key={item.label} className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-base text-green-100">{item.label}</span>
                  <span className="font-bold text-yellow-400">{item.amount}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center">
              <span className="font-bold">Total Per Bulan</span>
              <span className="text-2xl font-extrabold text-yellow-400">{data.totalBulanan}</span>
            </div>
          </div>

          {/* Biaya Awal Masuk */}
          <div className="bg-green-50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Info size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Hanya Sekali</p>
                <h3 className="text-lg font-extrabold text-gray-800">Biaya Awal Masuk</h3>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {data.awalMasuk.map((item) => (
                <li key={item.label} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-base text-gray-700">{item.label}</span>
                  <span className="font-bold text-green-700">{item.amount}</span>
                </li>
              ))}
            </ul>
            <div className="bg-green-100 rounded-2xl p-4 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Awal Masuk</span>
              <span className="text-2xl font-extrabold text-green-700">{data.totalAwal}</span>
            </div>
            <div className="mt-6">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Sudah Termasuk</p>
              <div className="grid grid-cols-2 gap-2">
                {fasilitas.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3">
          <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-base text-yellow-800">
            <strong>Catatan:</strong> Biaya dapat berubah sewaktu-waktu. Untuk informasi terkini, silakan hubungi pengurus pondok secara langsung.
          </p>
        </div>
      </div>
    </section>
  );
}

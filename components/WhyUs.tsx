import { BookOpen, Users, Award, Heart } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    title: "Kurikulum Terpadu",
    desc: "Memadukan ilmu agama (kitab kuning) dengan pendidikan formal yang terstruktur dan terarah.",
  },
  {
    icon: Users,
    title: "Pengasuh Berpengalaman",
    desc: "Diasuh oleh K. Muhammad Hakimin dengan pengalaman mengajar lebih dari 25 tahun.",
  },
  {
    icon: Award,
    title: "Sanad Keilmuan Kuat",
    desc: "Memiliki sanad keilmuan dari Ponpes APIK Kaliwungu dan Al-Fadllu Wal Fadhilah.",
  },
  {
    icon: Heart,
    title: "Lingkungan Islami",
    desc: "Suasana pesantren yang kondusif, penuh kasih sayang, dan mendukung perkembangan santri.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
            Kami hadir untuk mencetak generasi penerus yang tidak hanya cerdas
            secara intelektual, tetapi juga kuat secara spiritual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-green-50 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-400 transition-colors">
                <item.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

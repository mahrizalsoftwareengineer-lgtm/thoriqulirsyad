import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Alumni 2020",
    text: "Alhamdulillah, berkat bimbingan di Thoriqul Irsyad saya berhasil menghafal 30 juz. Pengasuh dan ustadz sangat sabar dan penuh kasih sayang.",
    rating: 5,
  },
  {
    name: "Siti Aisyah",
    role: "Wali Santri",
    text: "Anak saya sangat berkembang di sini, tidak hanya hafalan Al-Qur'an tapi juga akhlaknya. Biaya terjangkau dengan kualitas pendidikan yang luar biasa.",
    rating: 5,
  },
  {
    name: "Muhammad Rizki",
    role: "Santri Aktif",
    text: "Suasana pondok sangat nyaman dan kondusif untuk belajar. Teman-teman dan ustadz sangat mendukung perkembangan saya.",
    rating: 5,
  },
];

export default function Testimoni() {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Kata Mereka
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Kesan & Pesan
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Apa yang dirasakan oleh santri, alumni, dan wali santri tentang
            Pondok Pesantren Thoriqul Irsyad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <Quote size={32} className="text-green-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-xs text-green-600">{item.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

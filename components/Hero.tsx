import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f5a2a 0%, #1a7a3c 50%, #2d9e55 100%)" }}
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-white translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-white -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-10 items-center w-full">
        {/* Left Content */}
        <div className="text-white z-10">
          <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            Pondok Pesantren
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Thoriqul Irsyad
          </h1>
          <p className="text-yellow-300 text-xl font-semibold mb-4">
            Jalan Menuju Petunjuk
          </p>
          <p className="text-green-100 text-sm leading-relaxed mb-8 max-w-md">
            Membentuk generasi Qur&apos;ani yang berakhlak mulia, berilmu luas,
            dan siap mengabdi kepada agama, bangsa, dan masyarakat.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#daftar"
              className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Daftar Sekarang
            </a>
            <a
              href="#profil"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: "25+", label: "Tahun Pengalaman" },
              { value: "500+", label: "Alumni" },
              { value: "3", label: "Program Unggulan" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-yellow-300">{stat.value}</p>
                <p className="text-xs text-green-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — foto galeri santri */}
        <div className="relative z-10 hidden md:flex flex-col gap-4 items-center">
          {/* Foto atas — sedikit miring kiri */}
          <div className="relative w-72 h-52 -rotate-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image
              src="/images/galeri 1 di dero.jpeg"
              alt="Kegiatan Santri"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Foto bawah — sedikit miring kanan */}
          <div className="relative w-72 h-52 rotate-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 -mt-6 ml-8">
            <Image
              src="/images/galeri 2 pak jumeno.jpeg"
              alt="Kegiatan Santri Bersama"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

type KontakData = {
  whatsapp: string;
};

export default function CTA({ kontak }: { kontak: KontakData }) {
  return (
    <section id="daftar" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-green-700 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-800 rounded-full -translate-x-1/3 translate-y-1/3 opacity-50" />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-10">
            <div className="text-white">
              <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                Penerimaan Santri Baru
              </span>
              <h2 className="text-3xl font-extrabold mb-4 leading-tight">
                Bergabunglah Bersama Kami
              </h2>
              <p className="text-green-100 text-sm leading-relaxed mb-6">
                Daftarkan putra/putri Anda sekarang dan jadikan mereka bagian dari keluarga besar Pondok Pesantren Thoriqul Irsyad.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${kontak.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Daftar Santri Baru via WhatsApp"
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Daftar via WhatsApp
                </a>
                <a href="#kontak" title="Hubungi Pondok Pesantren Thoriqul Irsyad" className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold px-6 py-3 rounded-full text-sm transition-colors">
                  Hubungi Kami
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/brosur B.jpg.jpeg" alt="Brosur Pendaftaran Pondok Al Quran Wonosobo" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

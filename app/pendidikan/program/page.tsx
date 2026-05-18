import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";
import { CalendarDays, Sparkles } from "lucide-react";

export default function ProgramPage() {
  const { program, kontak } = defaultKonten;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Pendidikan</span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Program &amp; Kegiatan</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {program.kegiatan.map((kat) => (
              <div key={kat.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                    <CalendarDays size={18} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-gray-800">{kat.title}</h3>
                </div>
                <ol className="space-y-2">
                  {kat.items.map((item, i) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-green-700 font-semibold w-4 flex-shrink-0">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <h3 className="font-extrabold text-gray-800">Program Peningkatan Spiritual</h3>
            </div>
            <div className="bg-green-700 rounded-xl p-5">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {program.spiritual.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white text-sm font-medium">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

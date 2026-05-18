import { CalendarDays, Sparkles } from "lucide-react";

type ProgramData = {
  kegiatan: { title: string; items: string[] }[];
  spiritual: string[];
};

export default function Program({ data }: { data: ProgramData }) {
  return (
    <section id="program" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Kurikulum
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Program &amp; Kegiatan Santri
          </h2>
        </div>

        {/* 3 kartu kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {data.kegiatan.map((kat) => (
            <div key={kat.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <CalendarDays size={18} className="text-white" />
                </div>
                <h3 className="font-extrabold text-gray-800 text-base">{kat.title}</h3>
              </div>
              <ol className="space-y-2">
                {kat.items.map((item, i) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-700 font-semibold w-4 flex-shrink-0">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Program Peningkatan Spiritual */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-white" />
            </div>
            <h3 className="font-extrabold text-gray-800 text-base">Program Peningkatan Spiritual</h3>
          </div>
          <div className="bg-green-700 rounded-xl p-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {data.spiritual.map((item) => (
                <li key={item} className="flex items-center gap-2 text-white text-sm font-medium">
                  <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

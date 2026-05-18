import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import defaultKonten from "@/data/konten.json";
import { BookOpen, Star, Layers } from "lucide-react";
import { supabase } from "@/lib/supabase";

const iconMap = {
  BookOpen,
  Star,
  Layers,
};

type KurikulumItem = {
  icon?: string;
  title: string;
  desc: string;
  badge: string;
};

async function getKurikulumItems() {
  const { data, error } = await supabase
    .from("konten")
    .select("value")
    .eq("key", "konten_utama")
    .single();

  if (error || !data?.value?.kurikulum) {
    return defaultKonten.kurikulum as KurikulumItem[];
  }

  return data.value.kurikulum as KurikulumItem[];
}

export default async function Kurikulum() {
  const { kontak } = defaultKonten;
  const kurikulumItems = await getKurikulumItems();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-green-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Pendidikan</span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Kurikulum</h1>
            <p className="text-gray-500 text-sm max-w-xl">
              Tiga pilar utama pendidikan yang kami tawarkan untuk membentuk santri yang komprehensif.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {kurikulumItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? BookOpen;
              return (
                <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-700 p-6 text-white">
                    <span className="inline-block bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full mb-4">{item.badge}</span>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-extrabold">{item.title}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer kontak={kontak} />
      <WhatsAppButton whatsapp={kontak.whatsapp} />
    </>
  );
}

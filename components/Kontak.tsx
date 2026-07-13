"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

type KontakData = {
  alamat: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  jamOperasional: string;
};

export default function Kontak({ data }: { data: KontakData }) {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const kontakInfo = [
    { icon: MapPin, label: "Alamat", value: data.alamat },
    { icon: Phone, label: "Telepon / WhatsApp", value: data.whatsappDisplay },
    { icon: Mail, label: "Email", value: data.email },
    { icon: Clock, label: "Jam Operasional", value: data.jamOperasional },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: "success", msg: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda." });
        setFormData({ nama: "", email: "", telepon: "", pesan: "" });
      } else {
        setStatus({ type: "error", msg: result.error || "Gagal mengirim pesan." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Terjadi kesalahan jaringan." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="kontak" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Lokasi & Kontak
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Hubungi &amp; Kunjungi Kami
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Kami siap menyambut kunjungan Anda. Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Kolom Kiri: Info Kontak & Maps */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-green-900 mb-6">Informasi Kontak</h3>
              
              <div className="space-y-4">
                {kontakInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a 
                href={`https://wa.me/${data.whatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                title="Chat dengan Pondok Pesantren Thoriqul Irsyad via WhatsApp"
                className="mt-8 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle size={20} />
                Chat via WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex-1 min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.816261300921!2d109.91133417476154!3d-7.374479992634913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa117e4477a4b%3A0xab406cce37b22c42!2sPondok%20Pesantren%20Thoriqul%20Irsyad!5e0!3m2!1sid!2sid!4v1779091221865!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Pondok Pesantren Thoriqul Irsyad"
              />
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-900 mb-2">Kirim Pesan</h3>
            <p className="text-gray-500 text-sm mb-6">Isi form di bawah dan kami akan membalas secepatnya.</p>
            
            {status.msg && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="Nama lengkap Anda"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-gray-500 font-normal">(opsional)</span></label>
                  <input 
                    type="email" 
                    placeholder="email@contoh.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">No. Telepon <span className="text-gray-500 font-normal">(opsional)</span></label>
                  <input 
                    type="tel" 
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                    value={formData.telepon}
                    onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow resize-none"
                  value={formData.pesan}
                  onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? "Mengirim..." : (
                  <>
                    <Send size={18} />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

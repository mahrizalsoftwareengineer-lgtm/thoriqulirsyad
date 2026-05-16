import { MapPin, Phone, Mail, Clock } from "lucide-react";

const kontakInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Wonosobo, Jawa Tengah, Indonesia",
  },
  {
    icon: Phone,
    label: "Telepon / WhatsApp",
    value: "+62 812-3456-7890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@thoriqulirsyad.ac.id",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Sabtu, 08.00 – 16.00 WIB",
  },
];

export default function Kontak() {
  return (
    <section id="kontak" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Lokasi
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Hubungi &amp; Kunjungi Kami
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Kami siap menyambut kunjungan Anda. Jangan ragu untuk menghubungi
            kami untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {kontakInfo.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-3">Media Sosial</p>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63246.41!2d109.9!3d-7.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9b!2sWonosobo!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ minHeight: "350px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Pondok Pesantren Thoriqul Irsyad"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

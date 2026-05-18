# 🕌 Pondok Pesantren Thoriqul Irsyad

Website resmi **Pondok Pesantren Thoriqul Irsyad** — lembaga pendidikan Islam yang berlokasi di Wonosobo, Jawa Tengah, Indonesia.

---

## 📖 Tentang Pesantren

**Thoriqul Irsyad** (Jalan Menuju Petunjuk) adalah pondok pesantren yang berdedikasi membentuk generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap mengabdi kepada agama, bangsa, dan masyarakat.

Pesantren ini diasuh oleh **K. Muhammad Hakimin, IH. Alh.** — seorang tokoh pendidik dengan pengalaman mengajar lebih dari 25 tahun di lingkungan Yayasan Al-Asy'ariyyah Wonosobo.

### Visi
Mewujudkan santri yang unggul dalam mutu dan berakhlak Qur'ani.

### Misi
Mendidik santri menjadi penghafal Al-Qur'an, ahli ilmu agama, dan bermanfaat bagi umat.

---

## 🌐 Fitur Website

| Halaman | Deskripsi |
|---|---|
| **Beranda** | Hero banner, statistik, keunggulan pondok |
| **Profil Pesantren** | Visi, misi, nilai, dan sejarah pondok |
| **Profil Pengasuh** | Biografi lengkap K. Muhammad Hakimin |
| **Kurikulum** | Tahfidz, Kitab Kuning, Pendidikan Formal |
| **Program & Kegiatan** | Kegiatan harian, mingguan, tahunan, spiritual |
| **Galeri Foto** | Dokumentasi kegiatan santri |
| **Pendaftaran** | Persyaratan & cara daftar via WhatsApp |
| **Kontak** | Alamat, nomor WA, email, peta lokasi |
| **Admin Panel** | Dashboard edit konten tanpa coding |

---

## ⚙️ Teknologi

- **[Next.js 15](https://nextjs.org)** — React framework dengan App Router
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** — Type safety
- **[Supabase](https://supabase.com)** — Database & storage (PostgreSQL)
- **[Lucide React](https://lucide.dev)** — Icon library
- **[Vercel](https://vercel.com)** — Hosting & deployment

---

## 🚀 Menjalankan Secara Lokal

### 1. Clone repository
```bash
git clone https://github.com/mahrizalsoftwareengineer-lgtm/thoriqulirsyad.git
cd thoriqulirsyad
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Buat file `.env.local` di root project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
```

### 4. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🔐 Admin Panel

Akses admin panel di `/admin` untuk mengelola konten website:

- **Hero** — tagline, deskripsi, statistik
- **Profil Pengasuh** — nama, riwayat pendidikan, pengabdian
- **Biaya** — rincian biaya bulanan & awal masuk
- **Program** — kegiatan harian/mingguan/tahunan & spiritual
- **Kontak** — alamat, nomor WA, email

---

## 🗄️ Setup Database (Supabase)

Jalankan SQL berikut di Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS konten (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📞 Kontak Pesantren

- 📍 Wonosobo, Jawa Tengah, Indonesia
- 📱 WhatsApp: +62 812-3456-7890
- 📧 info@thoriqulirsyad.ac.id

---

## 📄 Lisensi

© 2025 Pondok Pesantren Thoriqul Irsyad. Hak Cipta Dilindungi.

Dibuat dengan ❤️ untuk kemajuan pendidikan Islam.

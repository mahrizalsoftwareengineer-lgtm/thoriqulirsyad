# Pondok Pesantren Thoriqul Irsyad

Website resmi **Pondok Pesantren Thoriqul Irsyad** — lembaga pendidikan Islam yang berlokasi di Wonosobo, Jawa Tengah. Diasuh oleh **K. Muhammad Hakimin, IH. Alh.** dengan pengalaman mengajar lebih dari 25 tahun.

## Tentang Pondok

Thoriqul Irsyad (Jalan Menuju Petunjuk) adalah pondok pesantren yang berdedikasi membentuk generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap mengabdi kepada agama, bangsa, dan masyarakat.

### Program Unggulan
- **Tahfidz Al-Qur'an** (30 Juz)
- **Kajian Kitab Kuning** (Nahwu, Shorof, Fiqih, dll)
- **Pendidikan Diniyah Harian**

### Kegiatan Santri
- **Harian**: Diniyah, Kajian Kitab Kuning, Mujahadah, Lalaran
- **Mingguan**: Ziarah, Muhadlarah, Diba'iyah, Selapanan, Roan
- **Tahunan**: Ziarah Auliya', Haflah at-Tasyakur wal Imtihan

## 🛠️ Teknologi

Website ini dibangun menggunakan teknologi modern:

- **Next.js 16.2.6** — React framework untuk production
- **TypeScript** — Type-safe development
- **Tailwind CSS 4** — Utility-first CSS framework
- **Supabase** — Backend & Database
- **Sanity** — Headless CMS untuk content management
- **JWT & bcryptjs** — Authentication & Security
- **Lucide React** — Icon library

## 📁 Struktur Proyek

```
app/
├── page.tsx                 # Halaman utama
├── admin-ponpesno1/                   # Panel kontrol
│   ├── page.tsx
│   └── dashboard/
├── api/                     # API routes
│   ├── admin-ponpesno1/              # Panel API endpoints
│   │   ├── galeri/         # Manage galeri
│   │   ├── konten/         # Manage konten
│   │   ├── login/          # Panel login
│   │   ├── logout/         # Panel logout
│   │   └── youtube/        # Manage YouTube content
│   └── public/             # Public API endpoints
│       ├── galeri/
│       ├── konten/
│       └── youtube/
├── kontak/                  # Contact page
├── media/                   # Media pages
│   ├── galeri/             # Gallery
│   └── video/              # Videos
├── pendaftaran/            # Registration page
├── pendidikan/             # Education pages
│   ├── kurikulum/          # Curriculum
│   └── program/            # Programs
└── tentang/                # About pages
    ├── profil-pengasuh/    # Founder profile
    └── profil-pesantren/   # Institution profile

components/                 # Reusable React components
├── Navbar.tsx
├── Hero.tsx
├── WhyUs.tsx
├── Pengasuh.tsx
├── Program.tsx
├── Biaya.tsx
├── Galeri.tsx
├── Testimoni.tsx
├── CTA.tsx
├── Kontak.tsx
├── Footer.tsx
└── WhatsAppButton.tsx

lib/                        # Utilities & helpers
├── auth.ts                # Authentication logic
├── supabase.ts            # Supabase client
├── supabaseAdmin.ts       # Supabase admin
└── useKonten.ts           # Content hook

public/                    # Static assets
└── images/
```

## 🚀 Memulai Pengembangan

### Prasyarat
- Node.js 18+ 
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone <repository-url>
cd "Thoriqul Irsyad/website"

# Install dependencies
npm install

# Setup environment variables
# Buat file .env.local dan sesuaikan dengan konfigurasi Anda
cp .env.local.example .env.local
```

### Environment Variables

Konfigurasi file `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
```

### Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📦 Build & Production

```bash
# Build untuk production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## 📝 Fitur Utama

- ✅ Responsive design (mobile-first)
- ✅ Dynamic content management (Sanity CMS)
- ✅ Panel kontrol untuk managing content
- ✅ Gallery management
- ✅ YouTube integration
- ✅ Contact & Registration forms
- ✅ WhatsApp integration
- ✅ SEO optimized (metadata, sitemap, robots.txt)

## 🔐 Panel Kontrol

Akses panel kontrol di `/admin-ponpesno1` dengan login credentials yang sesuai.

**Fitur Panel:**
- Manage konten halaman
- Upload & manage galeri
- Manage video YouTube
- View analytics & statistics

## 📱 API Endpoints

### Public Routes
- `GET /api/konten` — Get all content
- `GET /api/galeri` — Get gallery images
- `GET /api/youtube` — Get YouTube videos

### Panel Routes (Protected)
- `POST /api/admin-ponpesno1/login` — Panel login
- `POST /api/admin-ponpesno1/logout` — Panel logout
- `POST /api/admin-ponpesno1/konten` — Create/update content
- `POST /api/admin-ponpesno1/galeri/upload` — Upload gallery images
- `POST /api/admin-ponpesno1/youtube` — Manage YouTube videos

## 🌐 Deployment

Website ini di-host di [Vercel](https://vercel.com). 

```bash
# Deploy ke Vercel
vercel deploy --prod
```

## 🤝 Kontribusi

Untuk berkontribusi:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Kontak & Support

- 📍 **Lokasi**: Wonosobo, Jawa Tengah, Indonesia
- 📱 **WhatsApp**: +62 812-3456-7890
- 📧 **Email**: contact@thoriqulirstyad.ac.id
- 🌐 **Website**: https://thoriqulirstyad.ac.id

## 📄 Lisensi

© 2025 Pondok Pesantren Thoriqul Irsyad. Hak Cipta Dilindungi.

Semua konten dan kode dalam repository ini dilindungi oleh hak cipta. Untuk penggunaan komersial atau reproduksi, hubungi pihak pondok pesantren.

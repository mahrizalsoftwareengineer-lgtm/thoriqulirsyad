# Website Pondok Pesantren Thoriqul Irsyad

Website resmi Pondok Pesantren Thoriqul Irsyad — dibangun dengan Next.js, Supabase, dan Sanity CMS.

---

## 🗂️ Struktur Project

```
website/
├── app/
│   ├── api/
│   │   ├── admin-ponpesno1/     ← API khusus admin (dilindungi auth)
│   │   │   ├── login/           ← Login admin
│   │   │   ├── logout/          ← Logout admin
│   │   │   ├── galeri/          ← Kelola galeri foto
│   │   │   ├── konten/          ← Kelola konten website
│   │   │   ├── messages/        ← Lihat/hapus pesan kontak
│   │   │   └── youtube/         ← Kelola video YouTube
│   │   ├── contact/             ← Form kontak publik
│   │   └── galeri/              ← Galeri publik
│   ├── admin-ponpesno1/         ← Halaman admin panel
│   ├── media/                   ← Halaman galeri & video
│   ├── pendaftaran/             ← Halaman pendaftaran santri
│   ├── pendidikan/              ← Info kurikulum & program
│   └── kontak/                  ← Halaman kontak
├── lib/
│   ├── auth.ts                  ← JWT + verifikasi credential
│   ├── rateLimiter.ts           ← Rate limiter (Upstash Redis)
│   ├── supabase.ts              ← Supabase client (public)
│   └── supabaseAdmin.ts         ← Supabase client (service role)
├── middleware.ts                ← Proteksi route admin via JWT
└── next.config.ts               ← Konfigurasi Next.js + security headers
```

---

## 🚀 Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Admin Panel
Buka [http://localhost:3000/admin-ponpesno1](http://localhost:3000/admin-ponpesno1)

Credential ada di `.env.local` (lihat bagian Environment Variables di bawah).

---

## ⚙️ Environment Variables

Buat file `.env.local` di root folder `website/`. File ini **tidak boleh di-commit ke Git** (sudah ada di `.gitignore`).

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Admin Panel — credential login
ADMIN_SECRET=                  # secret key untuk JWT token (buat string acak panjang)
ADMIN_USERNAME=                # username admin
ADMIN_PASSWORD=                # password admin

# Email (Resend)
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=email@tujuan.com

# Upstash Redis — rate limiter login
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

> **Kalau lupa password admin:** buka file `.env.local`, lihat nilai `ADMIN_PASSWORD`.

---

## 🔐 Arsitektur Keamanan

Dokumentasi ini dibuat pada **Juli 2026** setelah audit keamanan menyeluruh.

### Lapisan Keamanan (Defense in Depth)

```
Request dari browser
        │
        ▼
┌───────────────────┐
│   middleware.ts   │  ← Lapisan 1: cek JWT cookie di semua route /admin*
└────────┬──────────┘
         │ valid
         ▼
┌───────────────────┐
│  API Route Handler│  ← Lapisan 2: cek JWT lagi di dalam setiap handler
└────────┬──────────┘
         │ valid
         ▼
┌───────────────────┐
│  Supabase / DB    │  ← Lapisan 3: RLS (Row Level Security) di database
└───────────────────┘
```

Dua lapisan pertama dikontrol di kode ini. Lapisan ketiga dikontrol di dashboard Supabase.

---

### 1. Autentikasi Admin — `middleware.ts` + `lib/auth.ts`

- Semua route `/admin-ponpesno1/*` dan `/api/admin-ponpesno1/*` dilindungi JWT
- Token disimpan di cookie `panel_token` dengan flag: `httpOnly`, `secure`, `sameSite=lax`
- Token berlaku **7 hari**, lalu harus login ulang
- Verifikasi credential menggunakan **timing-safe comparison** (`crypto.timingSafeEqual`) untuk mencegah timing attack
- Library JWT: `jose` (bukan jsonwebtoken lama)

### 2. Rate Limiter Login — `lib/rateLimiter.ts`

- Maks **5 percobaan login gagal** per IP per 15 menit
- Setelah 5x gagal → dikunci 15 menit
- Menggunakan **Upstash Redis** (bukan in-memory) sehingga efektif di Vercel serverless
- Konfigurasi Upstash: `console.upstash.com` → database `thoriqul-irsyad`

> **Kenapa Redis?** Di Vercel, setiap request bisa ditangani server berbeda. In-memory counter akan selalu reset. Redis adalah penyimpanan terpusat yang dibaca semua server sekaligus.

### 3. Validasi Upload File — `api/admin-ponpesno1/galeri/upload/route.ts`

Upload foto galeri divalidasi berlapis:

| Validasi | Detail |
|---|---|
| Ukuran file | Maks 5 MB |
| MIME type | Hanya `image/jpeg`, `image/png`, `image/webp`, `image/gif` |
| Ekstensi file | Hanya `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` |
| Magic bytes | Cek header binary file (tidak bisa ditipu dengan ganti ekstensi) |
| Nama file | Diganti otomatis ke `timestamp.ext` — nama asli dibuang |

### 4. Sanitasi Input — `api/contact/route.ts`

- Semua input form kontak di-escape HTML sebelum dikirim via email
- Mencegah XSS (Cross-Site Scripting) di email notifikasi
- Batasan panjang input: Nama (100 karakter), Pesan (2000 karakter), Email (200 karakter), Telepon (20 karakter)

### 5. Security Headers — `next.config.ts`

Header HTTP keamanan yang aktif di semua halaman:

| Header | Nilai | Fungsi |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000` | Paksa HTTPS selama 2 tahun |
| `X-Frame-Options` | `SAMEORIGIN` | Cegah clickjacking |
| `X-Content-Type-Options` | `nosniff` | Cegah MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | Proteksi XSS browser lama |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Batasi info referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Blokir akses sensor |
| `Content-Security-Policy` | (lihat next.config.ts) | Batasi sumber script/style/koneksi |

### 6. Proteksi Tiap Route Admin (Defense in Depth)

Setiap API route admin punya pengecekan token sendiri, **tidak hanya mengandalkan middleware**:

```typescript
// Contoh pola di setiap route admin:
const token = req.cookies.get("panel_token")?.value;
if (!token || !(await verifyToken(token))) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

File yang menerapkan pola ini:
- `api/admin-ponpesno1/galeri/route.ts`
- `api/admin-ponpesno1/konten/route.ts`
- `api/admin-ponpesno1/messages/route.ts`
- `api/admin-ponpesno1/youtube/route.ts`
- `api/admin-ponpesno1/galeri/upload/route.ts`

---

## 🛠️ Layanan Eksternal

| Layanan | Fungsi | Dashboard |
|---|---|---|
| **Supabase** | Database + Storage gambar | supabase.com |
| **Vercel** | Hosting website | vercel.com |
| **Upstash** | Redis untuk rate limiter | console.upstash.com |
| **Resend** | Kirim email notifikasi kontak | resend.com |

---

## 📋 Checklist Deploy ke Vercel

Setiap kali deploy ulang atau setup di server baru, pastikan semua env variable ini sudah diset di Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `ADMIN_SECRET`
- [ ] `ADMIN_USERNAME`
- [ ] `ADMIN_PASSWORD`
- [ ] `RESEND_API_KEY`
- [ ] `CONTACT_EMAIL_TO`
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

---

## ⚠️ Yang Perlu Diingat

1. **Jangan pernah commit `.env.local`** — file ini sudah di-gitignore, jangan hapus baris itu
2. **Credential ada di `.env.local`** — kalau lupa password, buka file itu
3. **Kalau ganti password** — update di `.env.local` (lokal) DAN di Vercel dashboard (production), lalu redeploy
4. **Upstash Redis gratis** sampai 10.000 request/hari — cukup untuk website pesantren

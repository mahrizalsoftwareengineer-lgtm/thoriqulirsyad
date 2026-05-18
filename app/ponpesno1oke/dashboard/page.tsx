"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultKonten from "@/data/konten.json";

type Konten = {
  profil: {
    nama: string;
    gelar: string;
    deskripsi: string;
    pengabdian: string;
    tahunPengabdian: string;
    riwayat: string[];
  };
  biaya: {
    bulanan: { label: string; amount: string }[];
    totalBulanan: string;
    awalMasuk: { label: string; amount: string }[];
    totalAwal: string;
  };
  kontak: {
    alamat: string;
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    jamOperasional: string;
  };
  hero: {
    tagline: string;
    deskripsi: string;
    stats: { value: string; label: string }[];
  };
  kurikulum: {
    icon?: string;
    title: string;
    desc: string;
    badge: string;
  }[];
  program: {
    kegiatan: { title: string; items: string[] }[];
    spiritual: string[];
  };
};

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
};

type VideoItem = {
  id: string;
  embed_code: string;
};

const tabs = ["Hero", "Profil Pengasuh", "Biaya", "Kurikulum", "Program", "Kontak", "Galeri", "YouTube"];

export default function Dashboard() {
  const router = useRouter();
  const [konten, setKonten] = useState<Konten | null>(null);
  const [activeTab, setActiveTab] = useState("Hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [videoEmbed, setVideoEmbed] = useState("");
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaSaving, setMediaSaving] = useState(false);

  useEffect(() => {
    fetch("/api/ponpesno1oke/konten")
      .then((r) => {
        if (r.status === 401) {
          router.push("/ponpesno1oke");
          return null;
        }
        if (!r.ok) throw new Error("Gagal memuat data");
        return r.json();
      })
      .then((data) => {
        if (data) {
          setKonten({
            ...defaultKonten,
            ...data,
            hero: { ...defaultKonten.hero, ...(data.hero || {}) },
            profil: { ...defaultKonten.profil, ...(data.profil || {}) },
            biaya: { ...defaultKonten.biaya, ...(data.biaya || {}) },
            kontak: { ...defaultKonten.kontak, ...(data.kontak || {}) },
            kurikulum: data.kurikulum ?? defaultKonten.kurikulum,
            program: {
              kegiatan: data.program?.kegiatan ?? defaultKonten.program.kegiatan,
              spiritual: data.program?.spiritual ?? defaultKonten.program.spiritual,
            },
          } as Konten);
        }
      })
      .catch(() => router.push("/ponpesno1oke"));

    loadMedia();
  }, [router]);

  async function loadMedia() {
    setMediaLoading(true);
    const [galleryRes, videosRes] = await Promise.all([
      fetch("/api/ponpesno1oke/galeri"),
      fetch("/api/ponpesno1oke/youtube"),
    ]);

    if (galleryRes.ok) {
      const data = await galleryRes.json();
      setGalleryItems(Array.isArray(data) ? data : []);
    }

    if (videosRes.ok) {
      const data = await videosRes.json();
      setVideoItems(Array.isArray(data) ? data : []);
    }

    setMediaLoading(false);
  }

  async function handleSave() {
    if (!konten) return;
    setSaving(true);
    await fetch("/api/ponpesno1oke/konten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(konten),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleLogout() {
    await fetch("/api/ponpesno1oke/logout", { method: "POST" });
    router.push("/ponpesno1oke");
  }

  async function handleUploadGallery() {
    if (!galleryTitle.trim() || !galleryFile) {
      alert("Judul dan gambar wajib diisi.");
      return;
    }

    setMediaSaving(true);
    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("file", galleryFile);

    const res = await fetch("/api/ponpesno1oke/galeri/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`Gagal upload gambar: ${err.error ?? "Terjadi kesalahan saat mengunggah."}`);
      setMediaSaving(false);
      return;
    }

    setGalleryTitle("");
    setGalleryFile(null);
    await loadMedia();
    setMediaSaving(false);
  }

  async function handleDeleteGallery(id: string) {
    if (!confirm("Hapus item galeri ini?")) return;
    setMediaSaving(true);
    await fetch(`/api/ponpesno1oke/galeri?id=${id}`, { method: "DELETE" });
    await loadMedia();
    setMediaSaving(false);
  }

  async function handleAddVideo() {
    if (!videoEmbed.trim()) {
      alert("Embed code YouTube wajib diisi.");
      return;
    }
    setMediaSaving(true);
    const res = await fetch("/api/ponpesno1oke/youtube", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embed_code: videoEmbed }),
    });
    if (res.ok) {
      setVideoEmbed("");
      await loadMedia();
    } else {
      const err = await res.json();
      alert(`Gagal menyimpan video: ${err.error ?? "unknown"}`);
    }
    setMediaSaving(false);
  }

  async function handleDeleteVideo(id: string) {
    if (!confirm("Hapus video ini?")) return;
    setMediaSaving(true);
    await fetch(`/api/ponpesno1oke/youtube?id=${id}`, { method: "DELETE" });
    await loadMedia();
    setMediaSaving(false);
  }

  if (!konten) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-green-700 font-semibold">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Logo" width={36} height={36} className="rounded-full object-cover" />
          <div>
            <p className="font-extrabold text-sm">Panel Kontrol</p>
            <p className="text-xs text-green-200">Thoriqul Irsyad</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">
            Lihat Website
          </a>
          <button onClick={handleLogout} className="text-xs bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors">
            Keluar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {activeTab === "Hero" && (
            <div className="space-y-4">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Hero Banner</h2>
              <div>
                <label className="label">Tagline</label>
                <input className="input" value={konten.hero.tagline}
                  onChange={(e) => setKonten({ ...konten, hero: { ...konten.hero, tagline: e.target.value } })} />
              </div>
              <div>
                <label className="label">Deskripsi</label>
                <textarea className="input" rows={3} value={konten.hero.deskripsi}
                  onChange={(e) => setKonten({ ...konten, hero: { ...konten.hero, deskripsi: e.target.value } })} />
              </div>
              <div>
                <label className="label">Statistik</label>
                {(konten.hero.stats ?? []).map((stat, i) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input className="input w-24" placeholder="Nilai" value={stat.value}
                      onChange={(e) => {
                        const s = [...konten.hero.stats];
                        s[i] = { ...s[i], value: e.target.value };
                        setKonten({ ...konten, hero: { ...konten.hero, stats: s } });
                      }} />
                    <input className="input flex-1" placeholder="Label" value={stat.label}
                      onChange={(e) => {
                        const s = [...konten.hero.stats];
                        s[i] = { ...s[i], label: e.target.value };
                        setKonten({ ...konten, hero: { ...konten.hero, stats: s } });
                      }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Profil Pengasuh" && (
            <div className="space-y-4">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Profil Pengasuh</h2>
              <div>
                <label className="label">Nama Lengkap</label>
                <input className="input" value={konten.profil.nama}
                  onChange={(e) => setKonten({ ...konten, profil: { ...konten.profil, nama: e.target.value } })} />
              </div>
              <div>
                <label className="label">Gelar / Panggilan</label>
                <input className="input" value={konten.profil.gelar}
                  onChange={(e) => setKonten({ ...konten, profil: { ...konten.profil, gelar: e.target.value } })} />
              </div>
              <div>
                <label className="label">Deskripsi</label>
                <textarea className="input" rows={4} value={konten.profil.deskripsi}
                  onChange={(e) => setKonten({ ...konten, profil: { ...konten.profil, deskripsi: e.target.value } })} />
              </div>
              <div>
                <label className="label">Tempat Pengabdian</label>
                <input className="input" value={konten.profil.pengabdian}
                  onChange={(e) => setKonten({ ...konten, profil: { ...konten.profil, pengabdian: e.target.value } })} />
              </div>
              <div>
                <label className="label">Tahun Pengabdian</label>
                <input className="input" value={konten.profil.tahunPengabdian}
                  onChange={(e) => setKonten({ ...konten, profil: { ...konten.profil, tahunPengabdian: e.target.value } })} />
              </div>
              <div>
                <label className="label">Riwayat Pendidikan</label>
                {(konten.profil.riwayat ?? []).map((r, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input flex-1" value={r}
                      onChange={(e) => {
                        const arr = [...konten.profil.riwayat];
                        arr[i] = e.target.value;
                        setKonten({ ...konten, profil: { ...konten.profil, riwayat: arr } });
                      }} />
                    <button onClick={() => {
                      const arr = konten.profil.riwayat.filter((_, idx) => idx !== i);
                      setKonten({ ...konten, profil: { ...konten.profil, riwayat: arr } });
                    }} className="text-red-400 hover:text-red-600 text-xs px-2">Hapus</button>
                  </div>
                ))}
                <button onClick={() => setKonten({ ...konten, profil: { ...konten.profil, riwayat: [...konten.profil.riwayat, ""] } })}
                  className="text-green-700 text-xs font-semibold hover:underline mt-1">+ Tambah Riwayat</button>
              </div>
            </div>
          )}

          {activeTab === "Biaya" && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Rincian Biaya</h2>
              <div>
                <label className="label">Biaya Bulanan</label>
                {(konten.biaya.bulanan ?? []).map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input flex-1" placeholder="Keterangan" value={item.label}
                      onChange={(e) => {
                        const arr = [...konten.biaya.bulanan];
                        arr[i] = { ...arr[i], label: e.target.value };
                        setKonten({ ...konten, biaya: { ...konten.biaya, bulanan: arr } });
                      }} />
                    <input className="input w-36" placeholder="Nominal" value={item.amount}
                      onChange={(e) => {
                        const arr = [...konten.biaya.bulanan];
                        arr[i] = { ...arr[i], amount: e.target.value };
                        setKonten({ ...konten, biaya: { ...konten.biaya, bulanan: arr } });
                      }} />
                  </div>
                ))}
                <div className="flex gap-2 mt-1">
                  <label className="label w-full">Total Bulanan</label>
                  <input className="input w-36" value={konten.biaya.totalBulanan}
                    onChange={(e) => setKonten({ ...konten, biaya: { ...konten.biaya, totalBulanan: e.target.value } })} />
                </div>
              </div>
              <div>
                <label className="label">Biaya Awal Masuk</label>
                {(konten.biaya.awalMasuk ?? []).map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input flex-1" placeholder="Keterangan" value={item.label}
                      onChange={(e) => {
                        const arr = [...konten.biaya.awalMasuk];
                        arr[i] = { ...arr[i], label: e.target.value };
                        setKonten({ ...konten, biaya: { ...konten.biaya, awalMasuk: arr } });
                      }} />
                    <input className="input w-36" placeholder="Nominal" value={item.amount}
                      onChange={(e) => {
                        const arr = [...konten.biaya.awalMasuk];
                        arr[i] = { ...arr[i], amount: e.target.value };
                        setKonten({ ...konten, biaya: { ...konten.biaya, awalMasuk: arr } });
                      }} />
                  </div>
                ))}
                <div className="flex gap-2 mt-1">
                  <label className="label w-full">Total Awal Masuk</label>
                  <input className="input w-36" value={konten.biaya.totalAwal}
                    onChange={(e) => setKonten({ ...konten, biaya: { ...konten.biaya, totalAwal: e.target.value } })} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Kurikulum" && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Kurikulum</h2>
              {(konten.kurikulum ?? []).map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4">
                  <div className="grid gap-4 md:grid-cols-[140px_1fr] items-center">
                    <div>
                      <label className="label">Icon</label>
                      <input
                        className="input"
                        value={item.icon ?? "BookOpen"}
                        onChange={(e) => {
                          const arr = [...konten.kurikulum];
                          arr[index] = { ...arr[index], icon: e.target.value };
                          setKonten({ ...konten, kurikulum: arr });
                        }}
                      />
                    </div>
                    <div>
                      <label className="label">Judul</label>
                      <input
                        className="input"
                        value={item.title}
                        onChange={(e) => {
                          const arr = [...konten.kurikulum];
                          arr[index] = { ...arr[index], title: e.target.value };
                          setKonten({ ...konten, kurikulum: arr });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Deskripsi</label>
                      <textarea
                        className="input"
                        rows={3}
                        value={item.desc}
                        onChange={(e) => {
                          const arr = [...konten.kurikulum];
                          arr[index] = { ...arr[index], desc: e.target.value };
                          setKonten({ ...konten, kurikulum: arr });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <label className="label">Badge</label>
                        <input
                          className="input"
                          value={item.badge}
                          onChange={(e) => {
                            const arr = [...konten.kurikulum];
                            arr[index] = { ...arr[index], badge: e.target.value };
                            setKonten({ ...konten, kurikulum: arr });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          const arr = konten.kurikulum.filter((_, idx) => idx !== index);
                          setKonten({ ...konten, kurikulum: arr });
                        }}
                        className="text-red-500 text-xs font-semibold hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setKonten({
                    ...konten,
                    kurikulum: [...konten.kurikulum, { icon: "BookOpen", title: "", desc: "", badge: "" }],
                  })
                }
                className="text-green-700 text-xs font-semibold hover:underline"
              >
                + Tambah Kurikulum
              </button>
            </div>
          )}

          {activeTab === "Program" && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Program &amp; Kegiatan</h2>
              {(konten.program.kegiatan ?? []).map((kat, ki) => (
                <div key={ki} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      className="input font-semibold"
                      value={kat.title}
                      onChange={(e) => {
                        const arr = [...konten.program.kegiatan];
                        arr[ki] = { ...arr[ki], title: e.target.value };
                        setKonten({ ...konten, program: { ...konten.program, kegiatan: arr } });
                      }}
                    />
                  </div>
                  <label className="label">Item Kegiatan</label>
                  {(kat.items ?? []).map((item, ii) => (
                    <div key={ii} className="flex gap-2 mb-2">
                      <input
                        className="input flex-1"
                        value={item}
                        onChange={(e) => {
                          const arr = [...konten.program.kegiatan];
                          const items = [...arr[ki].items];
                          items[ii] = e.target.value;
                          arr[ki] = { ...arr[ki], items };
                          setKonten({ ...konten, program: { ...konten.program, kegiatan: arr } });
                        }}
                      />
                      <button
                        onClick={() => {
                          const arr = [...konten.program.kegiatan];
                          arr[ki] = { ...arr[ki], items: arr[ki].items.filter((_, idx) => idx !== ii) };
                          setKonten({ ...konten, program: { ...konten.program, kegiatan: arr } });
                        }}
                        className="text-red-400 hover:text-red-600 text-xs px-2"
                      >Hapus</button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const arr = [...konten.program.kegiatan];
                      arr[ki] = { ...arr[ki], items: [...arr[ki].items, ""] };
                      setKonten({ ...konten, program: { ...konten.program, kegiatan: arr } });
                    }}
                    className="text-green-700 text-xs font-semibold hover:underline mt-1"
                  >+ Tambah Item</button>
                </div>
              ))}
              <div className="border border-gray-100 rounded-xl p-4">
                <label className="label text-base font-extrabold text-gray-800 mb-3 block">Program Peningkatan Spiritual</label>
                {(konten.program.spiritual ?? []).map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      className="input flex-1"
                      value={item}
                      onChange={(e) => {
                        const arr = [...konten.program.spiritual];
                        arr[i] = e.target.value;
                        setKonten({ ...konten, program: { ...konten.program, spiritual: arr } });
                      }}
                    />
                    <button
                      onClick={() => {
                        const arr = konten.program.spiritual.filter((_, idx) => idx !== i);
                        setKonten({ ...konten, program: { ...konten.program, spiritual: arr } });
                      }}
                      className="text-red-400 hover:text-red-600 text-xs px-2"
                    >Hapus</button>
                  </div>
                ))}
                <button
                  onClick={() => setKonten({ ...konten, program: { ...konten.program, spiritual: [...konten.program.spiritual, ""] } })}
                  className="text-green-700 text-xs font-semibold hover:underline mt-1"
                >+ Tambah Program</button>
              </div>
            </div>
          )}

          {activeTab === "Kontak" && (
            <div className="space-y-4">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Edit Informasi Kontak</h2>
              <div>
                <label className="label">Alamat</label>
                <input className="input" value={konten.kontak.alamat}
                  onChange={(e) => setKonten({ ...konten, kontak: { ...konten.kontak, alamat: e.target.value } })} />
              </div>
              <div>
                <label className="label">Nomor WhatsApp (tanpa +, contoh: 6281234567890)</label>
                <input className="input" value={konten.kontak.whatsapp}
                  onChange={(e) => setKonten({ ...konten, kontak: { ...konten.kontak, whatsapp: e.target.value } })} />
              </div>
              <div>
                <label className="label">Tampilan Nomor WA (contoh: +62 812-3456-7890)</label>
                <input className="input" value={konten.kontak.whatsappDisplay}
                  onChange={(e) => setKonten({ ...konten, kontak: { ...konten.kontak, whatsappDisplay: e.target.value } })} />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" value={konten.kontak.email}
                  onChange={(e) => setKonten({ ...konten, kontak: { ...konten.kontak, email: e.target.value } })} />
              </div>
              <div>
                <label className="label">Jam Operasional</label>
                <input className="input" value={konten.kontak.jamOperasional}
                  onChange={(e) => setKonten({ ...konten, kontak: { ...konten.kontak, jamOperasional: e.target.value } })} />
              </div>
            </div>
          )}

          {activeTab === "Galeri" && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">Galeri</h2>
              <div className="grid gap-4">
                <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                  <label className="label">Judul Gambar</label>
                  <input className="input" value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
                  <label className="label mt-4">Pilih Gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGalleryFile(e.target.files?.[0] ?? null)}
                    className="w-full"
                  />
                  {galleryFile && <p className="text-sm text-gray-600 mt-2">File: {galleryFile.name}</p>}
                  <button
                    onClick={handleUploadGallery}
                    disabled={mediaSaving}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-green-700 text-white font-bold px-6 py-3 text-sm hover:bg-green-800 transition-colors disabled:opacity-60"
                  >
                    {mediaSaving ? "Mengunggah..." : "Unggah Gambar"}
                  </button>
                </div>

                <div className="grid gap-3">
                  {mediaLoading ? (
                    <div className="text-gray-500">Memuat daftar galeri...</div>
                  ) : galleryItems.length === 0 ? (
                    <div className="text-gray-500">Belum ada gambar galeri.</div>
                  ) : (
                    galleryItems.map((item) => (
                      <div key={item.id} className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                        <div className="relative h-64">
                          <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="font-semibold text-gray-800">{item.title}</p>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="mt-3 text-red-500 text-xs font-semibold hover:text-red-700"
                          >Hapus</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "YouTube" && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4">YouTube Embed</h2>
              <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                <label className="label">Embed Code YouTube</label>
                <textarea
                  className="input"
                  rows={4}
                  value={videoEmbed}
                  onChange={(e) => setVideoEmbed(e.target.value)}
                />
                <button
                  onClick={handleAddVideo}
                  disabled={mediaSaving}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-green-700 text-white font-bold px-6 py-3 text-sm hover:bg-green-800 transition-colors disabled:opacity-60"
                >
                  {mediaSaving ? "Menyimpan..." : "Simpan Embed"}
                </button>
              </div>

              <div className="space-y-4">
                {mediaLoading ? (
                  <div className="text-gray-500">Memuat daftar video...</div>
                ) : videoItems.length === 0 ? (
                  <div className="text-gray-500">Belum ada video tersimpan.</div>
                ) : (
                  videoItems.map((video) => (
                    <div key={video.id} className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                      <div className="p-4">
                        <div className="aspect-video overflow-hidden">
                          <div dangerouslySetInnerHTML={{ __html: video.embed_code }} />
                        </div>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="mt-3 text-red-500 text-xs font-semibold hover:text-red-700"
                        >Hapus</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            {saved && (
              <span className="text-green-600 text-sm font-semibold">✓ Tersimpan!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

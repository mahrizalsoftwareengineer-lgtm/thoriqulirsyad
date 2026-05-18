"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PanelLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/ponpesno1oke/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      router.push("/ponpesno1oke/dashboard");
    } else {
      setError(data.error || "Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.jpeg"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full object-cover mb-3"
          />
          <h1 className="text-xl font-extrabold text-gray-800">Panel Kontrol</h1>
          <p className="text-xs text-gray-500 mt-1">Pondok Pesantren Thoriqul Irsyad</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Gunakan kredensial yang aman yang sudah dikonfigurasi melalui variabel lingkungan.
        </p>
      </div>
    </div>
  );
}

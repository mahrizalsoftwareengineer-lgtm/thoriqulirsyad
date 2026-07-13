import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { checkRateLimit } from "@/lib/rateLimiter";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_EMAIL_TO || "ponpesthoriqulirsyad@gmail.com";

/**
 * Escape karakter HTML untuk mencegah XSS di email.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  try {
    // Rate limiting per IP — cegah spam form kontak
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, retryAfterSeconds } = await checkRateLimit(`contact:${ip}`);
    if (!allowed) {
      return NextResponse.json(
        { error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfterSeconds} detik.` },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        }
      );
    }

    const { nama, email, telepon, pesan } = await req.json();

    // Validasi input wajib
    if (!nama || !pesan) {
      return NextResponse.json({ error: "Nama dan Pesan wajib diisi." }, { status: 400 });
    }

    // Batasi panjang input untuk mencegah abuse
    if (typeof nama !== "string" || nama.length > 100) {
      return NextResponse.json({ error: "Nama maksimal 100 karakter." }, { status: 400 });
    }
    if (typeof pesan !== "string" || pesan.length > 2000) {
      return NextResponse.json({ error: "Pesan maksimal 2000 karakter." }, { status: 400 });
    }
    if (email && (typeof email !== "string" || email.length > 200)) {
      return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
    }
    if (telepon && (typeof telepon !== "string" || telepon.length > 20)) {
      return NextResponse.json({ error: "Nomor telepon tidak valid." }, { status: 400 });
    }

    // 1. Simpan ke database Supabase
    const { error: dbError } = await supabaseAdmin
      .from("messages")
      .insert([
        {
          nama,
          email: email || null,
          telepon: telepon || null,
          pesan,
        },
      ]);

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      return NextResponse.json({ error: "Gagal menyimpan pesan ke database." }, { status: 500 });
    }

    // 2. Kirim Notifikasi Email via Resend — semua input di-escape untuk mencegah XSS
    try {
      await resend.emails.send({
        from: "Website Pesantren <onboarding@resend.dev>",
        to: toEmail,
        subject: `Pesan Baru dari ${escapeHtml(nama)} - Website Thoriqul Irsyad`,
        html: `
          <h3>Pesan Baru dari Pengunjung Website</h3>
          <p><strong>Nama:</strong> ${escapeHtml(nama)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || "-")}</p>
          <p><strong>No Telepon:</strong> ${escapeHtml(telepon || "-")}</p>
          <br/>
          <p><strong>Pesan:</strong></p>
          <p>${escapeHtml(pesan)}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend Error:", emailErr);
      // Tetap sukseskan response ke user walaupun email gagal (karena sudah masuk DB)
    }

    return NextResponse.json({ success: true, message: "Pesan berhasil dikirim." });
  } catch (err: unknown) {
    console.error("Contact API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan internal server." }, { status: 500 });
  }
}

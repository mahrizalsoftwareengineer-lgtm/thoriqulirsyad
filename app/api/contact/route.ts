import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_EMAIL_TO || "info@ppthoriqulirsyad.com";

export async function POST(req: Request) {
  try {
    const { nama, email, telepon, pesan } = await req.json();

    if (!nama || !pesan) {
      return NextResponse.json({ error: "Nama dan Pesan wajib diisi." }, { status: 400 });
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

    // 2. Kirim Notifikasi Email via Resend
    try {
      await resend.emails.send({
        from: "Website Pesantren <onboarding@resend.dev>", // Menggunakan default resend jika belum setup domain
        to: toEmail,
        subject: `Pesan Baru dari ${nama} - Website Thoriqul Irsyad`,
        html: `
          <h3>Pesan Baru dari Pengunjung Website</h3>
          <p><strong>Nama:</strong> ${nama}</p>
          <p><strong>Email:</strong> ${email || "-"}</p>
          <p><strong>No Telepon:</strong> ${telepon || "-"}</p>
          <br/>
          <p><strong>Pesan:</strong></p>
          <p>${pesan}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend Error:", emailErr);
      // Tetap sukseskan response ke user walaupun email gagal (karena sudah masuk DB)
    }

    return NextResponse.json({ success: true, message: "Pesan berhasil dikirim." });
  } catch (err: any) {
    console.error("Contact API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan internal server." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import path from "path";

const bucket = process.env.NEXT_PUBLIC_SUPABASE_GALLERY_BUCKET ?? "gallery";

// isu #4 — validasi file upload
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title");
  const file = formData.get("file");

  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
  }

  if (title.length > 200) {
    return NextResponse.json({ error: "Judul maksimal 200 karakter" }, { status: 400 });
  }

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File gambar wajib disertakan" }, { status: 400 });
  }

  // Validasi ukuran file
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Ukuran file maksimal 5 MB" },
      { status: 400 }
    );
  }

  // Validasi MIME type yang dikirim client
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipe file tidak diizinkan. Gunakan JPG, PNG, WebP, atau GIF" },
      { status: 400 }
    );
  }

  // Validasi ekstensi file
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: "Ekstensi file tidak diizinkan" },
      { status: 400 }
    );
  }

  // Validasi magic bytes — pastikan ini benar-benar file gambar
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isValidImageBuffer(buffer, file.type)) {
    return NextResponse.json(
      { error: "Konten file tidak sesuai dengan tipe gambar yang dinyatakan" },
      { status: 400 }
    );
  }

  // Nama file aman — hanya timestamp + ekstensi, abaikan nama asli
  const safeName = `${Date.now()}${ext}`;
  const filePath = `uploads/${safeName}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!publicData?.publicUrl) {
    return NextResponse.json(
      { error: "Gagal mendapatkan URL publik" },
      { status: 500 }
    );
  }

  const { error: insertError } = await supabaseAdmin
    .from("gallery")
    .insert({ title: title.trim(), image_url: publicData.publicUrl });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/**
 * Validasi magic bytes file untuk memastikan konten sesuai tipe yang diklaim.
 * Mencegah bypass dengan mengubah ekstensi/Content-Type saja.
 */
function isValidImageBuffer(buf: Buffer, mimeType: string): boolean {
  if (buf.length < 4) return false;

  switch (mimeType) {
    case "image/jpeg":
      // JPEG: FF D8 FF
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;

    case "image/png":
      // PNG: 89 50 4E 47 0D 0A 1A 0A
      return (
        buf[0] === 0x89 &&
        buf[1] === 0x50 &&
        buf[2] === 0x4e &&
        buf[3] === 0x47
      );

    case "image/webp":
      // WebP: RIFF....WEBP
      return (
        buf.length >= 12 &&
        buf[0] === 0x52 && // R
        buf[1] === 0x49 && // I
        buf[2] === 0x46 && // F
        buf[3] === 0x46 && // F
        buf[8] === 0x57 && // W
        buf[9] === 0x45 && // E
        buf[10] === 0x42 && // B
        buf[11] === 0x50   // P
      );

    case "image/gif":
      // GIF: GIF87a atau GIF89a
      return (
        buf[0] === 0x47 && // G
        buf[1] === 0x49 && // I
        buf[2] === 0x46   // F
      );

    default:
      return false;
  }
}

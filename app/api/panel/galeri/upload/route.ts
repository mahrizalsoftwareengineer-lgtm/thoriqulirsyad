import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const bucket = process.env.NEXT_PUBLIC_SUPABASE_GALLERY_BUCKET ?? "gallery";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("panel_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title");
  const file = formData.get("file");

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const filePath = `${bucket}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(filePath, buffer, {
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicData } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
  if (!publicData?.publicUrl) {
    return NextResponse.json({ error: "Failed to get public URL" }, { status: 500 });
  }

  const image_url = publicData.publicUrl;
  const { error: insertError } = await supabaseAdmin.from("gallery").insert({ title, image_url });
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

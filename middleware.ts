import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Izinkan rute login (baik API maupun UI)
  if (
    pathname.startsWith("/api/admin-ponpesno1/login") ||
    pathname.startsWith("/admin-ponpesno1/login")
  ) {
    return NextResponse.next();
  }

  // Jika mengakses rute admin (API atau UI)
  const isAdminRoute =
    pathname.startsWith("/admin-ponpesno1") ||
    pathname.startsWith("/api/admin-ponpesno1");

  if (isAdminRoute) {
    const token = request.cookies.get("panel_token")?.value;

    let isValid = false;
    if (token) {
      const payload = await verifyToken(token);
      isValid = payload !== null;
    }

    if (!isValid) {
      // Jika request berupa API
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Jika request berupa halaman UI
      const loginUrl = new URL("/admin-ponpesno1/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    // Content Security Policy — membatasi sumber script, style, dan koneksi
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Script: izinkan self, inline (untuk Next.js), dan Google Analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Style: izinkan self dan inline (Next.js butuh ini)
      "style-src 'self' 'unsafe-inline'",
      // Gambar: izinkan self, data URI, dan Supabase storage
      "img-src 'self' data: blob: https://*.supabase.co",
      // Font
      "font-src 'self'",
      // Koneksi API: izinkan ke Supabase dan Google Analytics
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com",
      // Frame: izinkan YouTube untuk embed video
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      // Media
      "media-src 'self'",
      // Object (Flash, dll) — tidak diizinkan
      "object-src 'none'",
      // Base URI — hanya izinkan self
      "base-uri 'self'",
      // Form action — hanya izinkan self
      "form-action 'self'",
    ].join('; ')
  }
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    // Allow all local images and Supabase storage URLs for uploaded gallery images
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

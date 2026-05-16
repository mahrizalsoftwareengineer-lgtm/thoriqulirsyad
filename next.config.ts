import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all local images
    unoptimized: false,
  },
};

export default nextConfig;

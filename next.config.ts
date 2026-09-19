import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos are pre-sized WebP files (~11 KB each) in public/products,
    // so they are served as-is instead of through the image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', '127.0.0.1', 'hawssa-trainer-api.alsalhani.com'],
  },
  output: 'standalone',
};

export default nextConfig;

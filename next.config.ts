import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'hawssa-trainer-api.alsalhani.com',
      }
    ],
  },
  output: 'standalone',
};

export default nextConfig;

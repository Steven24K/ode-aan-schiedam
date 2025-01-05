import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/',
        search: '',
      },
    ],
  },

};

export default nextConfig;

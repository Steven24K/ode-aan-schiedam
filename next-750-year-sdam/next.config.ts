import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { 
            key: "Content-Security-Policy", 
            value: "frame-ancestors 'self' https://cms.odeaanschiedam.nl https://www.odeaanschiedam.nl" 
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://cms.odeaanschiedam.nl" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS, POST" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.STRAPI_CMS_URL}/uploads/:path*`
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.odeaanschiedam.nl',
      },
    ],
  },
};

export default nextConfig;

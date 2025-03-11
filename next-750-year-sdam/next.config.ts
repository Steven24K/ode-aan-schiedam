import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/uploads/:path*', 
        destination: process.env.STRAPI_CMS_URL + '/uploads/:path*'
      }
    ]
  },

};

export default nextConfig;

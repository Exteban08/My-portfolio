import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Disable service worker in development to prevent 404 errors
  async rewrites() {
    return [
      {
        source: '/dev-sw.js',
        destination: '/404',
      },
    ];
  },
};

export default nextConfig;

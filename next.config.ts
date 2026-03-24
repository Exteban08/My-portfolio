import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * CSP tuned for this app (Pages Router, Tailwind, local i18n bundles).
 * `script-src 'unsafe-inline'` is required because Next still emits inline
 * bootstrapping scripts (e.g. __NEXT_DATA__). Tightening further needs nonces
 * from middleware — see https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders],
      },
    ];
  },

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Site Generation — pre-renders all pages at build time
  // Remove 'output: export' if you want SSR on Vercel instead
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Allow next/image to work in SSG export
    unoptimized: false,
  },
};

module.exports = nextConfig;

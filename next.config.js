/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizeCss: false },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizeCss: false },
  images: {
    unoptimized: false,
    domains: ['cardi.pics', 'www.cardi.pics'],
  },
};

module.exports = nextConfig;

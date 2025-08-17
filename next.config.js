/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizeCss: false },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

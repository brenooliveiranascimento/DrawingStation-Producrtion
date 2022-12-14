/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['instagram.fgnm2-1.fna.fbcdn.net', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;

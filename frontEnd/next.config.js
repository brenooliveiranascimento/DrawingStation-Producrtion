/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['instagram.fgnm2-1.fna.fbcdn.net', 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'youtube.com'],
  },
};

module.exports = nextConfig;

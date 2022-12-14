/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ROOT_API: 'http://localhost:8080/api',
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  server: {
    port: process.env.PORT || 3002,
  },
  env: {
    // Set PROXY_PATH based on the environment
    PROXY_PATH: process.env.NODE_ENV === 'prod' ? '/spare' : '',
  }
};

module.exports = nextConfig;

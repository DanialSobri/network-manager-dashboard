/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  server: {
    port: process.env.PORT || 3002,
  },
  env: {
    // Set PROXY_PATH based on the environment
    PROXY_PATH: process.env.NODE_ENV !== 'prod' ? '/spare' : '',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

module.exports = nextConfig;

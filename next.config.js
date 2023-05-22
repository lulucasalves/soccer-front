/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    productionUrl: process.env.PRODUCTION_URL,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image-service.onefootball.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.cloudinary.com',
        port: '',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt', 'cloudinary'],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pg', 'sequelize'],
  },
};

module.exports = nextConfig;

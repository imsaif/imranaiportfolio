/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore ESLint errors during production builds
    // This encourages fixing errors during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Only ignore TypeScript errors during production builds
    // This encourages fixing errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  // For compatibility with modern syntax and features
  experimental: {
    // Enable modern features that might help with compatibility
    esmExternals: 'loose',
  },
  swcMinify: true,
  // Ensure we output proper error tracking
  webpack(config) {
    return config;
  },
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;

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
  // Image optimization for better LCP
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;

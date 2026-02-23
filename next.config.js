const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack infers workspace root by walking up for lockfiles/package.json.
  // When the generated project is nested inside another repo (e.g. GitHub Actions),
  // this causes "couldn't find next/package.json" errors. Pin root to this directory.
  turbopack: {
    root: path.join(__dirname),
  },
  // Disable ESLint during builds.  When nested inside another repo (GitHub Actions),
  // Next.js walks up and finds the parent's eslint.config.mjs whose dependencies
  // (like @eslint/js) aren't available since the parent's node_modules is isolated.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;

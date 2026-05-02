/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly set the root to the workspace root to avoid detection issues
  experimental: {
    turbo: {
      root: '..',
    },
  },
}

module.exports = nextConfig

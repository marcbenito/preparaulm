const { version } = require("./package.json")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["kakyvvmaqqvmizogjnve.supabase.co", "www.google.com"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    // Add other NEXT_PUBLIC_ variables here if needed
  },
}

module.exports = nextConfig

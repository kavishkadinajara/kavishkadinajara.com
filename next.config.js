/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'bdtpihbswhrgvmnmalzr.supabase.co',
      'images.unsplash.com',
      'assets.aceternity.com',
      'github.com',
    ],
  },
}

module.exports = nextConfig

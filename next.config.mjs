/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
        outputFileTracingExcludes: {
          '*': [
            'public/uploads/**',
            'public/hero.mp4',
            'public/bio/**',
            'public/Discographythumbnails/**',
            'public/press-kit/**',
          ],
        },
  },
}

export default nextConfig

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
        'public/uploads/**/*',
        'public/Discographythumbnails/**/*',
        'public/bio/**/*',
        'public/press-kit/**/*',
      ],
    },
  },
}

export default nextConfig

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
            // Exclude large M4A files (32MB each) - keep smaller MP3 files
            'public/uploads/*.m4a',
            'public/uploads/*.wav',
            'public/uploads/*.aac',
            'public/uploads/*.ogg',
            'public/bio/**',
            'public/Discographythumbnails/**',
            'public/press-kit/HIGH-RES PHOTOS/**',
          ],
        },
  },
}

export default nextConfig

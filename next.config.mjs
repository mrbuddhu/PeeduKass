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
            'public/uploads/*.mp3',
            'public/uploads/*.m4a',
            'public/uploads/*.wav',
            'public/uploads/*.aac',
            'public/uploads/*.ogg',
            'public/bio/**',
            'public/Discographythumbnails/**',
            'public/press-kit/**',
          ],
        },
  },
}

export default nextConfig

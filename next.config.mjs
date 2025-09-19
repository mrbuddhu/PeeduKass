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
        'public/uploads/**/*.mp3',
        'public/uploads/**/*.m4a',
        'public/uploads/**/*.wav',
        'public/uploads/**/*.aac',
        'public/uploads/**/*.ogg',
      ],
    },
  },
}

export default nextConfig

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
            // Keep only one audio file locally, exclude others
            'public/uploads/*.m4a',
            'public/uploads/1758278928632-5_reprise-armada_peedu-kass-raun-juurikas-andre-maaker.mp3',
            'public/uploads/1758278944754-7_jaaalohkuja-poeg_european-jazz-orchestra.mp3',
            'public/uploads/1758278952270-8_vihmhaapsalu_erki-parnoja-saja-lugu.mp3',
            'public/uploads/1758278957911-9_apple-tree_anna-kaneelina.mp3',
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

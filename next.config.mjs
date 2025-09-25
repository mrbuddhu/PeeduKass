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
            // Exclude original large audio files, include compressed ones
            'public/uploads/*.m4a',
            'public/uploads/1758278904319-1_force-minor_peedu-kass-momentum.m4a',
            'public/uploads/1758278909101-2_cinema-paradiso_peedu-kass-momentum.m4a',
            'public/uploads/1758278915557-3_kunagi-laanes_miljardid.m4a',
            'public/uploads/1758278922522-4_efterglow_erki-parnoja.mp3',
            'public/uploads/1758278928632-5_reprise-armada_peedu-kass-raun-juurikas-andre-maaker.mp3',
            'public/uploads/1758278938388-6_when-the-floods-are-over_peedu-kass-005.mp3',
            'public/uploads/1758278944754-7_jaaalohkuja-poeg_european-jazz-orchestra.mp3',
            'public/uploads/1758278952270-8_vihmhaapsalu_erki-parnoja-saja-lugu.mp3',
            'public/uploads/1758278957911-9_apple-tree_anna-kaneelina.mp3',
            'public/uploads/*.wav',
            'public/uploads/*.aac',
            'public/uploads/*.ogg',
            'public/uploads/AudioOriginals/**',
            'public/bio/**',
            'public/Discographythumbnails/**',
            'public/press-kit/HIGH-RES PHOTOS/**',
          ],
        },
  },
}

export default nextConfig

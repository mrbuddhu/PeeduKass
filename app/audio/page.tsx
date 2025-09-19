import AudioPlayer from "@/components/audio-player"
import DiscographyCarousel from "@/components/discography-carousel"

export const metadata = {
  title: "Audio - Peedu Kass | Music & Discography",
  description: "Listen to compositions and recordings by Peedu Kass. Explore his discography, albums, and musical works including jazz, contemporary, and experimental pieces.",
  keywords: "Peedu Kass, audio, music, discography, albums, compositions, recordings, jazz, bass, Estonian music",
  openGraph: {
    title: "Audio - Peedu Kass | Music & Discography",
    description: "Listen to compositions and recordings by Peedu Kass. Explore his discography, albums, and musical works including jazz, contemporary, and experimental pieces.",
    images: [
      {
        url: "https://peedukass.com/uploads/Peedu Kass Momentum_Peedu Kass Momentum.webp",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Audio & Discography",
      },
    ],
  },
  twitter: {
    title: "Audio - Peedu Kass | Music & Discography",
    description: "Listen to compositions and recordings by Peedu Kass. Explore his discography, albums, and musical works including jazz, contemporary, and experimental pieces.",
    images: ["https://peedukass.com/uploads/Peedu Kass Momentum_Peedu Kass Momentum.webp"],
  },
}

export default function AudioPage() {
  return (
    <div className="min-h-screen">
      <DiscographyCarousel />
      <AudioPlayer />
    </div>
  )
}

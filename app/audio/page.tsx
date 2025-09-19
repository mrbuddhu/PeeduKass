import AudioPlayer from "@/components/audio-player"
import DiscographyCarousel from "@/components/discography-carousel"

export const metadata = {
  title: "Audio - Peedu Kass",
  description: "Listen to compositions and recordings by Peedu Kass",
}

export default function AudioPage() {
  return (
    <div className="min-h-screen">
      <DiscographyCarousel />
      <AudioPlayer />
    </div>
  )
}

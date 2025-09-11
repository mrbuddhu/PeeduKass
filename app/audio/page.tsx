import AudioHero from "@/components/audio-hero"
import AudioPlayer from "@/components/audio-player"
import StreamingLinks from "@/components/streaming-links"

export const metadata = {
  title: "Audio - Peedu Kass",
  description: "Listen to compositions and recordings by Peedu Kass",
}

export default function AudioPage() {
  return (
    <div className="min-h-screen">
      <AudioHero />
      <AudioPlayer />
      <StreamingLinks />
    </div>
  )
}

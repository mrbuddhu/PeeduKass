import AudioPlayer from "@/components/audio-player"

export const metadata = {
  title: "Audio - Peedu Kass",
  description: "Listen to compositions and recordings by Peedu Kass",
}

export default function AudioPage() {
  return (
    <div className="min-h-screen">
      <AudioPlayer />
    </div>
  )
}

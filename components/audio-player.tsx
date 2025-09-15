"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-context"

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const { t } = useLanguage()

  const tracks = [
    {
      id: 1,
      title: "Midnight Reflections",
      album: "Original Compositions",
      duration: "4:32",
      src: "/placeholder-audio.mp3",
      artwork: "/placeholder.svg?height=300&width=300&text=Album+1",
    },
    {
      id: 2,
      title: "Estonian Landscapes",
      album: "Original Compositions",
      duration: "6:18",
      src: "/placeholder-audio.mp3",
      artwork: "/placeholder.svg?height=300&width=300&text=Album+2",
    },
    {
      id: 3,
      title: "Jazz Fusion Experiment",
      album: "Collaborative Works",
      duration: "5:45",
      src: "/placeholder-audio.mp3",
      artwork: "/placeholder.svg?height=300&width=300&text=Album+3",
    },
    {
      id: 4,
      title: "Acoustic Sessions",
      album: "Live Recordings",
      duration: "7:22",
      src: "/placeholder-audio.mp3",
      artwork: "/placeholder.svg?height=300&width=300&text=Album+4",
    },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Current Track Player */}
        <Card className="mb-12 overflow-hidden animate-fade-in-up">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Artwork */}
              <div className="aspect-square relative overflow-hidden rounded-lg animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
                <img
                  src={tracks[currentTrack].artwork || "/placeholder.svg"}
                  alt={tracks[currentTrack].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Track Info & Controls */}
              <div className="animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-playfair text-2xl font-bold text-black mb-2">{tracks[currentTrack].title}</h3>
                <p className="font-vietnam text-gray-600 mb-1">{tracks[currentTrack].album}</p>
                <p className="font-vietnam text-sm text-gray-500 mb-6">{tracks[currentTrack].duration}</p>

                {/* Audio Controls */}
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm" onClick={prevTrack}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="lg" onClick={togglePlay} className="rounded-full w-12 h-12">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextTrack}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress Bar Placeholder */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-black h-2 rounded-full w-1/3 transition-all duration-300" />
                </div>

                {/* Time Display */}
                <div className="flex justify-between text-sm text-gray-500 font-vietnam">
                  <span>1:24</span>
                  <span>{tracks[currentTrack].duration}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Track List */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-black mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>{t("audio.player.allTracks")}</h2>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <Card
                key={track.id}
                className={`cursor-pointer transition-colors animate-fade-in-up ${
                  index === currentTrack ? "bg-gray-50 border-black" : "hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                onClick={() => setCurrentTrack(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative overflow-hidden rounded">
                      <img
                        src={track.artwork || "/placeholder.svg"}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-vietnam font-medium text-black">{track.title}</h4>
                      <p className="font-vietnam text-sm text-gray-600">{track.album}</p>
                    </div>
                    <span className="font-vietnam text-sm text-gray-500">{track.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudioPlayer

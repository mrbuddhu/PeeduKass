"use client"

import { useState, useRef, useEffect } from "react"
import { SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-context"

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { t } = useLanguage()

  const tracks = [
    {
      id: 1,
      title: "Force Minor",
      album: "Peedu Kass Momentum",
      duration: "8:12",
      src: "/audio/force-minor.mp3", // Local audio file
      externalUrl: "https://www.youtube.com/watch?v=ivm7SN1wqxQ",
      artwork: "/placeholder.svg?height=300&width=300&text=Force+Minor",
    },
    {
      id: 2,
      title: "Cinema Paradiso",
      album: "Peedu Kass Momentum",
      duration: "6:18",
      src: "/audio/cinema-paradiso.mp3", // Local audio file
      externalUrl: "https://www.youtube.com/watch?v=qTUPyz3trkU",
      artwork: "/placeholder.svg?height=300&width=300&text=Cinema+Paradiso",
    },
    {
      id: 3,
      title: "CD PREVIEW",
      album: "Peedu Kass Momentum",
      duration: "4:32",
      src: "/audio/cd-preview.mp3", // Local audio file
      externalUrl: "https://on.soundcloud.com/6nkLjGnhmX1vXAAJqs",
      artwork: "/placeholder.svg?height=300&width=300&text=CD+PREVIEW",
    },
    {
      id: 4,
      title: "Seitse fragmenti",
      album: "Estonian National Symphony Orchestra",
      duration: "7:22",
      src: "/audio/seitse-fragmenti.mp3", // Local audio file
      externalUrl: "https://on.soundcloud.com/5QAY6RgK7GNLlkPSoC",
      artwork: "/placeholder.svg?height=300&width=300&text=Seitse+Fragmenti",
    },
    {
      id: 5,
      title: "Reprise: Armada",
      album: "Peedu Kass, Raun Juurikas, Andre Maaker",
      duration: "5:45",
      src: "/audio/reprise-armada.mp3", // Local audio file
      externalUrl: "https://on.soundcloud.com/B23SuOoT4iwa10Lspg",
      artwork: "/placeholder.svg?height=300&width=300&text=Reprise+Armada",
    },
  ]

  // Audio event handlers (kept for potential local playback fallback, but not used with embeds)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Ensure the audio source is the current track and respect play state
    audio.src = tracks[currentTrack].src
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log('Audio play failed:', error)
        setIsPlaying(false)
      })
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    const onEnded = () => {
      nextTrack(true)
    }
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentTrack, isPlaying])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // No explicit play/pause controls for embedded players

  const nextTrack = (autoPlay: boolean = false) => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(autoPlay ? true : false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const handleWaveformClick = (_e: React.MouseEvent) => {}

  const getEmbedUrl = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
    if (ytMatch && ytMatch[1]) {
      const id = ytMatch[1]
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=0&controls=1`
    }
    // SoundCloud (supports full or on.soundcloud.com short links)
    const encoded = encodeURIComponent(url)
    return `https://w.soundcloud.com/player/?url=${encoded}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true`
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Embedded Player */}
        <div className="mb-8 rounded-lg overflow-hidden bg-black/5">
          <iframe
            key={tracks[currentTrack].externalUrl}
            className="w-full h-64 md:h-80"
            src={getEmbedUrl(tracks[currentTrack].externalUrl)}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
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

                {/* Basic navigation (embeds handle play/pause) */}
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm" onClick={prevTrack}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => nextTrack(false)}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* No external redirects; play stays on-page */}

                {/* Decorative waveform retained but not interactive when using embeds */}
                <div className="w-full mb-6">
                  <div 
                    className="relative h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden"
                    onClick={handleWaveformClick}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      {Array.from({ length: 80 }).map((_, i) => (
                        <div key={i} className="w-1.5 bg-gray-400" style={{ height: `${Math.random() * 30 + 12}px`, transform: 'scaleY(0.9)' }} />
                      ))}
                    </div>
                  </div>
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
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(false);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative overflow-hidden rounded">
                      <img
                        src={track.artwork || "/placeholder.svg"}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {index === currentTrack && isPlaying && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-1 h-3 bg-black mx-0.5" />
                            <div className="w-1 h-3 bg-black mx-0.5" />
                          </div>
                        </div>
                      )}
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

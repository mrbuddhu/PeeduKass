"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
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

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      nextTrack()
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => {
        setIsPlaying(false)
        nextTrack()
      })
    }
  }, [currentTrack])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      // Load and play the current track
      const currentTrackSrc = tracks[currentTrack].src
      audio.src = currentTrackSrc
      audio.play().catch((error) => {
        console.log('Audio play failed:', error)
        // If local file doesn't exist, open external URL
        window.open(tracks[currentTrack].externalUrl, '_blank')
      })
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const handleWaveformClick = (e: React.MouseEvent) => {
    // For now, just update the visual progress
    // In the future, this can be connected to actual audio seeking
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickPercent = (clickX / width) * 100
    
    setProgress(clickPercent)
    // Simulate time update based on track duration
    const trackDuration = parseFloat(tracks[currentTrack].duration.replace(':', '.')) * 60
    setCurrentTime((clickPercent / 100) * trackDuration)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Audio Element for native playback */}
        <audio
          ref={audioRef}
          src={tracks[currentTrack].src}
          preload="metadata"
        />
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

                {/* Play on Platform Button */}
                <div className="mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(tracks[currentTrack].externalUrl, '_blank')}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play on {tracks[currentTrack].externalUrl.includes('soundcloud') ? 'SoundCloud' : 'YouTube'}
                  </Button>
                </div>

                {/* Custom Waveform Progress Bar */}
                <div className="w-full mb-6">
                  <div 
                    className="relative h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={handleWaveformClick}
                  >
                    {/* Waveform bars */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      {Array.from({ length: 80 }).map((_, i) => {
                        const isPlayed = (i / 80) * 100 < progress
                        return (
                          <div
                            key={i}
                            className={`w-1.5 transition-all duration-300 ${
                              isPlayed ? 'bg-black' : 'bg-gray-400'
                            }`}
                            style={{
                              height: `${Math.random() * 30 + 12}px`,
                              transform: 'scaleY(0.9)'
                            }}
                          />
                        )
                      })}
                    </div>
                    {/* Reflection effect */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-20" style={{ transform: 'scaleY(-1) translateY(32px)' }}>
                      {Array.from({ length: 80 }).map((_, i) => {
                        const isPlayed = (i / 80) * 100 < progress
                        return (
                          <div
                            key={i}
                            className={`w-1.5 transition-all duration-300 ${
                              isPlayed ? 'bg-black' : 'bg-gray-400'
                            }`}
                            style={{
                              height: `${Math.random() * 30 + 12}px`,
                              transform: 'scaleY(0.9)'
                            }}
                          />
                        )
                      })}
                    </div>
                    {/* Time indicators */}
                    <div className="absolute left-4 top-2 bg-black bg-opacity-80 text-white text-sm px-3 py-1 rounded-md font-vietnam">
                      {formatTime(currentTime)}
                    </div>
                    <div className="absolute right-4 top-2 bg-black bg-opacity-80 text-white text-sm px-3 py-1 rounded-md font-vietnam">
                      {formatTime(duration)}
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

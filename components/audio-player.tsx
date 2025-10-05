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
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const preloadRefs = useRef<HTMLAudioElement[]>([])
  const { t, language } = useLanguage()

  // Load external audio list if available
  const [externalTracks, setExternalTracks] = useState<any[] | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => fetch(`/api/content/audio/${language === "est" ? "est" : "en"}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (mounted && Array.isArray(data)) setExternalTracks(data) })
      .catch(() => {})
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel("cms")
      bc.onmessage = (e) => { if (e?.data?.type === "updated" && e?.data?.section === "audio") load() }
    } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener); if (bc) bc.close() }
  }, [language])
  const effectiveTracks = externalTracks || []

  // Preload next track for instant playback
  useEffect(() => {
    if (effectiveTracks.length === 0) return

    // Create preload audio elements for next few tracks
    const nextTrackIndex = (currentTrack + 1) % effectiveTracks.length
    const nextTrackSrc = effectiveTracks[nextTrackIndex]?.src

    if (nextTrackSrc) {
      // Create a hidden audio element to preload the next track
      const preloadAudio = document.createElement('audio')
      preloadAudio.preload = 'auto'
      preloadAudio.src = nextTrackSrc
      preloadAudio.load()
      
      // Store reference to prevent garbage collection
      preloadRefs.current.push(preloadAudio)
      
      // Clean up old preload elements (keep only last 2)
      if (preloadRefs.current.length > 2) {
        const oldAudio = preloadRefs.current.shift()
        if (oldAudio) {
          oldAudio.src = ''
          oldAudio.load()
        }
      }
    }
  }, [currentTrack, effectiveTracks])

  // Audio event handlers for native HTML5 playback
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || effectiveTracks.length === 0) return

    // Set the audio source to the current track (use local file only)
    const trackSrc = effectiveTracks[currentTrack]?.src
    if (trackSrc) {
      setIsLoading(true)
      audio.src = trackSrc
      audio.load() // Force reload
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      if (isFinite(audio.duration) && audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const updateDuration = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
        setIsLoading(false)
      }
    }

    const handleEnded = () => {
      nextTrack()
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      console.error('Audio loading error')
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrack, effectiveTracks])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      audio.play().then(() => {
        setIsPlaying(true)
        setIsLoading(false)
      }).catch((error) => {
        console.log('Audio play failed:', error)
        setIsLoading(false)
      })
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % effectiveTracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + effectiveTracks.length) % effectiveTracks.length)
  }

  const handleWaveformClick = (e: React.MouseEvent) => {
    const audio = audioRef.current
    if (!audio || !isFinite(audio.duration) || audio.duration <= 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickTime = (clickX / width) * audio.duration
    if (isFinite(clickTime) && clickTime >= 0) {
      audio.currentTime = clickTime
    }
  }

  // Don't render if no tracks loaded yet
  if (effectiveTracks.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-500">Loading audio tracks...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="auto" />
        {/* Current Track Player */}
        <Card className="mb-8 overflow-hidden animate-fade-in-up">
          <CardContent className="p-4">
            <div className="max-w-md mx-auto">
              {/* Track Info & Controls */}
              <div className="animate-fade-in-up text-center" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-playfair text-xl font-bold text-black mb-1">{effectiveTracks[currentTrack]?.title}</h3>
                <p className="font-vietnam text-gray-600 mb-1 text-sm">{effectiveTracks[currentTrack]?.album}</p>
                <p className="font-vietnam text-xs text-gray-500 mb-4">{effectiveTracks[currentTrack]?.duration}</p>

                {/* Play Controls */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Button variant="outline" size="sm" onClick={prevTrack} className="h-8 w-8 p-0">
                    <SkipBack className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full p-0"
                  >
                    {isLoading ? (
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    ) : isPlaying ? (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextTrack} className="h-8 w-8 p-0">
                    <SkipForward className="h-3 w-3" />
                  </Button>
                </div>


                {/* Time Display */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 max-w-xs mx-auto">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Interactive Waveform */}
                <div className="w-full max-w-sm mx-auto mb-4">
                  <div 
                    className="relative h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={handleWaveformClick}
                  >
                    {/* Progress Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-black to-gray-600 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                    
                    {/* Waveform Bars */}
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      {Array.from({ length: 60 }).map((_, i) => {
                        const isActive = (i / 60) * 100 <= progress
                        return (
                          <div 
                            key={i} 
                            className={`w-1 transition-colors duration-100 ${
                              isActive ? 'bg-white' : 'bg-gray-400'
                            }`} 
                            style={{ height: `${Math.random() * 20 + 8}px`, transform: 'scaleY(0.9)' }} 
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* Track List */}
        <div>
          <h2 className="font-playfair text-xl font-bold text-black mb-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>{t("audio.player.allTracks")}</h2>
          <div className="space-y-1">
            {effectiveTracks.map((track, index) => (
              <Card
                key={track.id}
                className={`cursor-pointer transition-colors animate-fade-in-up ${
                  index === currentTrack ? "bg-gray-50 border-black" : "hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                onClick={() => { 
                  setCurrentTrack(index)
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative overflow-hidden rounded">
                      <img
                        src={track.artwork || "/placeholder.svg"}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {index === currentTrack && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                            {isPlaying ? (
                              <svg className="w-1.5 h-1.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-1.5 h-1.5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-vietnam font-medium text-black text-sm">{track.title}</h4>
                      <p className="font-vietnam text-xs text-gray-600">{track.album}</p>
                    </div>
                    <span className="font-vietnam text-xs text-gray-500">{track.duration}</span>
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

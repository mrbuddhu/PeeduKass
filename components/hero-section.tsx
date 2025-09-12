"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "./language-context"

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Auto-play was prevented:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black md:-mt-20">
      {/* Hero Video - only loads if available */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover md:object-[50%_30%] lg:object-[50%_22%] opacity-90 md:scale-[1.12] lg:scale-[1.2] transform-gpu"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-end justify-center h-full pb-24 md:pb-32" style={{ paddingBottom: `calc(7rem + env(safe-area-inset-bottom, 0px))` }}>
        <div className="text-center px-6 max-w-5xl mx-auto">
          <div className="space-y-3 max-w-3xl mx-auto">
            <p className="font-vietnam text-lg md:text-2xl lg:text-3xl text-white font-light text-balance leading-relaxed drop-shadow-lg">
              {t("hero.intro")}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bottom-8 md:bottom-12" style={{ bottom: `calc(2rem + env(safe-area-inset-bottom, 0px))` }}>
        <div className="w-6 h-12 border border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
          <div className="w-1 h-4 bg-white/80 rounded-full mt-3 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-context"

const VideoGallery = () => {
  const { t } = useLanguage()
  const videos = [
    {
      id: 1,
      title: "Hiiglase hällilaulud intro",
      description: "Hiiglase hällilaulud intro by Peedu Kass",
      embedUrl: "https://drive.google.com/file/d/1DSIwR-10MGN6bpeZCIPxeWircEnQa2QH/preview",
    },
    {
      id: 2,
      title: "Teardrop", 
      description: "Teardrop by Peedu Kass",
      embedUrl: "https://drive.google.com/file/d/1Tlwdvf9lqqfFR9cbk3LS5is_X5mhcSU8/preview",
    },
    {
      id: 3,
      title: "Hommikumaa vägevad",
      description: "Hommikumaa vägevad by Peedu Kass",
      embedUrl: "https://drive.google.com/file/d/16zSAfTorK2F219kp3KKdclEo2c6yar8w/preview",
    },
    {
      id: 4,
      title: "Cinema Paradiso",
      description: "Cinema Paradiso by Peedu Kass Momentum",
      embedUrl: "https://drive.google.com/file/d/13XGeQwrr43dYg2eK7yPzn9bTNO-veUj4/preview",
    },
    {
      id: 5,
      title: "Roots Of Coincidence",
      description: "Roots Of Coincidence - Pat Metheny transcription by Peedu Kass",
      embedUrl: "https://drive.google.com/file/d/1PDteAqLEJXwCGEfz-baEOVIA8UWX0wnq/preview",
    },
  ]

  // Load external videos if available
  const [externalVideos, setExternalVideos] = useState<typeof videos | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => fetch("/content/videos.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (mounted && Array.isArray(data)) setExternalVideos(data) })
      .catch(() => {})
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    try {
      const bc = new BroadcastChannel("cms")
      bc.onmessage = (e) => { if (e?.data?.type === "updated") load() }
    } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener) }
  }, [])
  const list = externalVideos || []

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center animate-fade-in-up">{t("gallery.videos.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((video, index) => (
            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-lg animate-fade-in-up" style={{ animationDelay: `${0.2 + (index * 0.2)}s` }}>
              {/* Google Drive Embed */}
              <div className="aspect-video relative">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-black">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <p className="font-vietnam text-gray-600 mb-4">{t("gallery.videos.more")}</p>
          <a
            href="https://youtube.com/peedu07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-600 transition-colors font-vietnam font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.5 6.2c-.2-1.2-1.2-2.1-2.4-2.3C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.1.4C1.7 4.1.7 5 .5 6.2.1 8 .1 12 .1 12s0 4 .4 5.8c.2 1.2 1.2 2.1 2.4 2.3 1.7.4 9.1.4 9.1.4s7.4 0 9.1-.4c1.2-.2 2.2-1.1 2.4-2.3.4-1.8.4-5.8.4-5.8s0-4-.4-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/>
            </svg>
            Visit YouTube Channel
          </a>
        </div>
      </div>
    </section>
  )
}

export default VideoGallery

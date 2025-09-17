"use client"

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

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center animate-fade-in-up">{t("gallery.videos.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
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
                <h3 className="font-playfair text-xl font-semibold text-black mb-2">{video.title}</h3>
                <p className="font-vietnam text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <p className="font-vietnam text-gray-600 mb-4">{t("gallery.videos.more")}</p>
          <a
            href="https://www.instagram.com/peedukass/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-vietnam font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {t("gallery.videos.visit")}
          </a>
        </div>
      </div>
    </section>
  )
}

export default VideoGallery

"use client"

import { useLanguage } from "./language-context"

const VideoGallery = () => {
  const { t } = useLanguage()
  const videos = [
    {
      id: 1,
      title: "Force Minor",
      description: "Force Minor by Peedu Kass Momentum",
      embedId: "ULhrckApTwo",
      thumbnail: `https://img.youtube.com/vi/ULhrckApTwo/maxresdefault.jpg`,
    },
    {
      id: 2,
      title: "Cinema Paradiso", 
      description: "Cinema Paradiso by Peedu Kass Momentum",
      embedId: "WvdPUFJ6HNk",
      thumbnail: `https://img.youtube.com/vi/WvdPUFJ6HNk/maxresdefault.jpg`,
    },
    {
      id: 3,
      title: "Peedu Kass Performance",
      description: "Live performance by Peedu Kass",
      embedId: "xczuO1HIRnM",
      thumbnail: `https://img.youtube.com/vi/xczuO1HIRnM/maxresdefault.jpg`,
    },
    {
      id: 4,
      title: "Studio Session",
      description: "Studio recording session with Peedu Kass",
      embedId: "3OcwbVXiHH8",
      thumbnail: `https://img.youtube.com/vi/3OcwbVXiHH8/maxresdefault.jpg`,
    },
    {
      id: 5,
      title: "Momentum",
      description: "Momentum by Peedu Kass Momentum",
      embedId: "riNh3reLrjY",
      thumbnail: `https://img.youtube.com/vi/riNh3reLrjY/maxresdefault.jpg`,
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center animate-fade-in-up">{t("gallery.videos.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-lg animate-fade-in-up" style={{ animationDelay: `${0.2 + (index * 0.2)}s` }}>
              {/* YouTube Embed */}
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0`}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-vietnam font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            {t("gallery.videos.visit")}
          </a>
        </div>
      </div>
    </section>
  )
}

export default VideoGallery

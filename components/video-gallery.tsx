"use client"

import { useLanguage } from "./language-context"

const VideoGallery = () => {
  const { t } = useLanguage()
  const videos = [
    {
      id: 1,
      title: "Live Performance - Original Composition",
      description: "Performing an original composition at Tallinn Jazz Festival",
      embedId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      thumbnail: "/placeholder.svg?height=315&width=560&text=Video+1",
    },
    {
      id: 2,
      title: "Studio Session - Behind the Scenes",
      description: "Behind the scenes footage from recent recording session",
      embedId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      thumbnail: "/placeholder.svg?height=315&width=560&text=Video+2",
    },
    {
      id: 3,
      title: "Masterclass - Bass Techniques",
      description: "Educational content covering advanced bass playing techniques",
      embedId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      thumbnail: "/placeholder.svg?height=315&width=560&text=Video+3",
    },
    {
      id: 4,
      title: "Collaborative Performance",
      description: "Performing with guest musicians in an intimate setting",
      embedId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      thumbnail: "/placeholder.svg?height=315&width=560&text=Video+4",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center">{t("gallery.videos.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Video Embed Placeholder */}
              <div className="aspect-video relative bg-gray-200">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-black mb-2">{video.title}</h3>
                <p className="font-vietnam text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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

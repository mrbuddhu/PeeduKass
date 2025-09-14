"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "./language-context"

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { t } = useLanguage()

  const photos = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800&text=Performance+1",
      alt: "Live performance at Tallinn Jazz Club",
      caption: "Live performance at Tallinn Jazz Club",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800&text=Studio+Session",
      alt: "Recording session in the studio",
      caption: "Recording session in the studio",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800&text=Collaboration",
      alt: "Collaboration with fellow musicians",
      caption: "Collaboration with fellow musicians",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800&text=Bass+Close-up",
      alt: "Close-up of bass guitar",
      caption: "Close-up of bass guitar",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800&text=Concert+Hall",
      alt: "Performance at Tartu Music Hall",
      caption: "Performance at Tartu Music Hall",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800&text=Teaching",
      alt: "Teaching masterclass",
      caption: "Teaching masterclass",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=600&width=800&text=Backstage",
      alt: "Backstage preparation",
      caption: "Backstage preparation",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=600&width=800&text=Ensemble",
      alt: "Performing with ensemble",
      caption: "Performing with ensemble",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center">{t("gallery.photos.title")}</h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(photo.src)}
            >
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected photo"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PhotoGallery

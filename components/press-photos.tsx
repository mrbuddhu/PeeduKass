"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { useLanguage } from "./language-context"

const PressPhotos = () => {
  const { t } = useLanguage()
  const defaults = [
    {
      id: 1,
      src: "/uploads/2_photo_by_Harri_Rospu.webp",
      alt: "Peedu Kass — photo by Harri Rospu",
      title: "Photo by Harri Rospu",
      resolution: "300 DPI",
    },
    {
      id: 2,
      src: "/uploads/1_photo_by_Martin_Heinmets.webp",
      alt: "Peedu Kass — photo by Martin Heinmets",
      title: "Photo by Martin Heinmets",
      resolution: "300 DPI",
    },
    {
      id: 3,
      src: "/uploads/3_photo_by_Martin_Heinmets.webp",
      alt: "Peedu Kass — photo by Martin Heinmets",
      title: "Photo by Martin Heinmets",
      resolution: "300 DPI",
    },
    {
      id: 4,
      src: "/uploads/2_photo_by_Harri_Rospu.webp",
      alt: "Peedu Kass — photo by Harri Rospu",
      title: "Photo by Harri Rospu",
      resolution: "300 DPI",
    },
  ]

  const [external, setExternal] = useState<typeof defaults | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => fetch("/content/press-photos.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (mounted && Array.isArray(data)) setExternal(data) })
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

  // Prefer admin items over defaults when IDs collide
  const photos = [...(external || []), ...defaults].filter((item, index, self) => index === self.findIndex(i => i.id === item.id))

  const handleDownload = (photo: typeof defaults[0]) => {
    const link = document.createElement('a')
    link.href = photo.src
    link.download = `${photo.title.replace(/\s+/g, '_')}.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center animate-fade-in-up">{t("press.photos.title")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {photos.map((photo, index) => (
            <div key={photo.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=400&width=300&text=Press+Photo"
                    }}
                  />
                  <button
                    onClick={() => handleDownload(photo)}
                    className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors duration-200 font-vietnam text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-vietnam text-gray-600 mb-4">Need high-resolution versions or additional photos?</p>
          <button
            onClick={() => {
              const link = document.createElement('a')
              link.href = "/press-kit/HIGH-RES PHOTOS.zip"
              link.download = "Peedu_Kass_Press_Photos.zip"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-black transition-colors duration-200 font-vietnam"
          >
            <Download className="w-5 h-5" />
            Download All Press Photos (ZIP)
          </button>
        </div>
      </div>
    </section>
  )
}

export default PressPhotos
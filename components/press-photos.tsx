"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useLanguage } from "./language-context"

const PressPhotos = () => {
  const { t } = useLanguage()
  const pressPhotos = [
    {
      id: 1,
      src: "/press-kit/HIGH-RES PHOTOS/HIGH-RES PHOTOS/1_Harri_Rospu.JPG",
      alt: "Peedu Kass — photo by Harri Rospu",
      title: "Photo by Harri Rospu",
      resolution: "300 DPI",
    },
    {
      id: 2,
      src: "/press-kit/HIGH-RES PHOTOS/HIGH-RES PHOTOS/3_Krõõt_Tarkmeel.JPG",
      alt: "Peedu Kass — photo by Krõõt Tarkmeel",
      title: "Photo by Krõõt Tarkmeel",
      resolution: "300 DPI",
    },
    {
      id: 3,
      src: "/press-kit/HIGH-RES PHOTOS/HIGH-RES PHOTOS/7_Martin_Heinmets.jpg",
      alt: "Peedu Kass — photo by Martin Heinmets",
      title: "Photo by Martin Heinmets",
      resolution: "300 DPI",
    },
    {
      id: 4,
      src: "/press-kit/HIGH-RES PHOTOS/HIGH-RES PHOTOS/5_Stina_Kase.jpeg",
      alt: "Peedu Kass — photo by Stina Kase",
      title: "Photo by Stina Kase",
      resolution: "300 DPI",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center animate-fade-in-up">{t("press.photos.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg animate-fade-in-up cursor-pointer" 
              style={{ animationDelay: `${0.2 + (index * 0.2)}s` }}
              onClick={() => {
                const link = document.createElement('a')
                link.href = encodeURI(photo.src)
                link.download = photo.src.split('/').pop() || 'press-photo.jpg'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <div className="relative overflow-hidden shadow-3xl rounded-2xl transform hover:scale-105 hover:shadow-4xl transition-all duration-500 group w-full h-full bg-gray-100">
                  <img
                    src={encodeURI(photo.src) || "/placeholder.svg"}
                    alt={photo.alt}
                    className={`w-full h-full ${index === 0 ? 'object-cover object-[50%_20%]' : 'object-contain'} transition-all duration-700`}
                  />
                  <div className="absolute inset-0 pointer-events-none" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-center">
                <Button 
                  size="sm" 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = encodeURI(photo.src)
                    link.download = photo.src.split('/').pop() || 'press-photo.jpg'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <Download className="h-4 w-4" />
                  {t("press.kit.download")}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <Button 
            size="lg" 
            className="flex items-center gap-2 mx-auto"
            onClick={() => {
              const link = document.createElement('a')
              link.href = "/press-kit/HIGH-RES PHOTOS.zip"
              link.download = "HIGH-RES PHOTOS.zip"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            <Download className="h-5 w-5" />
            {t("press.photos.downloadAll")}
          </Button>
          <p className="font-vietnam text-sm text-gray-600 mt-4">
            {t("press.photos.contact")}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PressPhotos

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const PressPhotos = () => {
  const pressPhotos = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600&text=Press+Photo+1",
      alt: "Peedu Kass professional headshot",
      title: "Professional Headshot",
      resolution: "300 DPI",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600&text=Press+Photo+2",
      alt: "Peedu Kass performing live",
      title: "Live Performance",
      resolution: "300 DPI",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600&text=Press+Photo+3",
      alt: "Peedu Kass in studio",
      title: "Studio Session",
      resolution: "300 DPI",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600&text=Press+Photo+4",
      alt: "Peedu Kass with bass guitar",
      title: "Portrait with Bass",
      resolution: "300 DPI",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center">Press Photos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-[3/2] relative overflow-hidden">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-black mb-1">{photo.title}</h3>
                    <p className="font-vietnam text-sm text-gray-600">{photo.resolution}</p>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="flex items-center gap-2 mx-auto">
            <Download className="h-5 w-5" />
            Download All Photos
          </Button>
          <p className="font-vietnam text-sm text-gray-600 mt-4">
            For additional photos or specific requirements, please contact us directly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PressPhotos

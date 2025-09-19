"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "./language-context"

const discography = [
  {
    id: 1,
    title: "Peedu Kass Momentum",
    year: "2016",
    image: "/uploads/Peedu Kass Momentum_Peedu Kass Momentum.webp",
    link: "#"
  },
  {
    id: 2,
    title: "Armada",
    year: "2012",
    image: "/uploads/Armada_Peedu Kass Raun Juurikas Andre Maaker.webp",
    link: "#"
  },
  {
    id: 3,
    title: "Home",
    year: "2010",
    image: "/uploads/Home_Peedu Kass 005.webp",
    link: "#"
  },
  {
    id: 5,
    title: "Ma luban, et ma muutun",
    year: "2021",
    image: "/uploads/Ma luban, et ma muutun_Miljardid.webp",
    link: "#"
  },
  {
    id: 8,
    title: "Anna Kaneelina",
    year: "2018",
    image: "/uploads/Anna Kaneelina_Anna Kaneelina.webp",
    link: "#"
  },
  {
    id: 9,
    title: "Baltic Sketches",
    year: "2017",
    image: "/uploads/Baltic Sketches_Tree Stones Quartet.webp",
    link: "#"
  },
  {
    id: 10,
    title: "Imeline",
    year: "2019",
    image: "/uploads/Imeline_Miljardid.webp",
    link: "#"
  },
  {
    id: 11,
    title: "Ood metsale",
    year: "2021",
    image: "/uploads/Ood metsale_Joel Remmel Peedu Kass.webp",
    link: "#"
  }
]

const DiscographyCarousel = () => {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsToShow = 3
  const maxIndex = Math.max(0, discography.length - itemsToShow)

  const nextSlide = () => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  }

  const prevSlide = () => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)
  }

  return (
    <section className="py-16 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-4">
            {language === "en" ? "Discography" : "Diskograafia"}
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-4" />
          <p className="font-vietnam text-gray-600 text-sm">
            {language === "en" ? "Selected releases" : "Valitud väljaanded"}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {discography.map((album, index) => (
                <div key={album.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsToShow}%` }}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 max-w-48 mx-auto">
                      {/* Blurred background */}
                      <img
                        src={album.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=300&width=300&text=Album+Cover"
                        }}
                        loading="lazy"
                      />
                      {/* Main image */}
                      <img
                        src={album.image}
                        alt={album.title}
                        className="relative w-full aspect-square object-contain z-10 transition-all duration-500"
                        style={index === 2 ? { objectPosition: "center 0%" } : undefined}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=300&width=300&text=Album+Cover"
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous albums"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Next albums"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscographyCarousel

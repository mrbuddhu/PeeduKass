"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const awards = [
  {
    id: 1,
    title: "Dummy: Jazz Ensemble of the Year",
    image: "/placeholder.svg?height=600&width=800&text=Jazz+Award",
    link: "#",
  },
  {
    id: 2,
    title: "Dummy: Sony Jazz Stage Grand Prix",
    image: "/placeholder.svg?height=600&width=800&text=Grand+Prix",
    link: "#",
  },
  {
    id: 3,
    title: "Dummy: Young Talent Prize – Jazzkaar",
    image: "/placeholder.svg?height=600&width=800&text=Young+Talent",
    link: "#",
  },
]

const AwardsSection = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black">Awards & Accolades</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {awards.map((award, index) => (
            <Card key={award.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white group p-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Blurred background */}
                <img src={award.image} alt="" className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110" />
                {/* Main image */}
                <img src={award.image} alt={award.title} className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 z-10" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-20" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-playfair text-2xl font-semibold text-black mb-4 leading-tight">{award.title}</h3>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 bg-transparent border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide font-vietnam"
                  onClick={() => award.link !== "#" && window.open(award.link, "_blank")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsSection



"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"

const BandsSection = () => {
  const { t } = useLanguage()
  const bands = [
    {
      name: "Kass-Talsi-Sink-Minn",
      members: [
        "Villu Talsi (mandolin)",
        "Theodor Sink (cello)",
        "Simone Minn (viola, voice)",
        "PK (bass, electronics)"
      ],
      image: "/placeholder.svg?height=400&width=400&text=Kass-Talsi-Sink-Minn",
      link: "#" // You can provide the actual link
    },
    {
      name: "Peedu Kass Solo",
      members: [
        "kontrabass, basskitarr, elektroonika"
      ],
      image: "/placeholder.svg?height=400&width=400&text=Peedu+Kass+Solo",
      link: "#" // You can provide the actual link
    },
    {
      name: "Miljardid",
      members: [
        "Marten Kuningas (voc, gtr)",
        "Raul Ojamaa (gtr)",
        "Kristjan Kallas (drs)",
        "PK (bs)"
      ],
      image: "/placeholder.svg?height=400&width=400&text=Miljardid",
      link: "#" // You can provide the actual link
    },
    {
      name: "Funkifize",
      members: [
        "Lauri Pihlap (voc)",
        "Marianne Leibur (voc)",
        "Pent Järve (gtr)",
        "Tanel Kuusk (trp)",
        "Keio Vutt (sax)",
        "Caspar Salo (drs)",
        "PK (bs)"
      ],
      image: "/placeholder.svg?height=400&width=400&text=Funkifize",
      link: "#" // You can provide the actual link
    },
    {
      name: "Ajaväli",
      members: [
        "Raun Juurikas (kbd)",
        "Liisi Koikson (voc)",
        "Andre Maaker (gtr)",
        "Martin Petermann (drs)",
        "PK (bs)"
      ],
      image: "/placeholder.svg?height=400&width=400&text=Ajaväli",
      link: "#" // You can provide the actual link
    }
  ]

  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
            {t("about.bands.title")}
          </h2>
          <div className="w-32 h-px bg-white mx-auto mb-8"></div>
          <p className="font-vietnam text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            {t("about.bands.subtitle")}
          </p>
        </div>

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {bands.slice(0, 3).map((band, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={band.image || "/placeholder.svg"}
                  alt={band.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
                  {band.name.toUpperCase()}
                </h3>
                <div className="space-y-2 mb-6">
                  {band.members.map((member, memberIndex) => (
                    <p
                      key={memberIndex}
                      className="font-vietnam text-sm text-white/70 leading-relaxed"
                    >
                      {member}
                    </p>
                  ))}
                </div>
                <Button
                  onClick={() => window.open(band.link, '_blank')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bands.slice(3, 5).map((band, index) => (
            <Card
              key={index + 3}
              className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${(index + 3) * 0.2}s` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={band.image || "/placeholder.svg"}
                  alt={band.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
                  {band.name.toUpperCase()}
                </h3>
                <div className="space-y-2 mb-6">
                  {band.members.map((member, memberIndex) => (
                    <p
                      key={memberIndex}
                      className="font-vietnam text-sm text-white/70 leading-relaxed"
                    >
                      {member}
                    </p>
                  ))}
                </div>
                <Button
                  onClick={() => window.open(band.link, '_blank')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BandsSection

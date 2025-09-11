import { Card, CardContent } from "@/components/ui/card"

const BandsSection = () => {
  const bandMembers = [
    {
      name: "Peedu Kass",
      role: "Bass, Composition",
      image: "/placeholder.svg?height=400&width=400&text=Peedu+Kass",
      bio: "Lead bassist and primary composer, bringing over 20 years of professional experience to every performance.",
    },
    {
      name: "Collaborator 1",
      role: "Piano, Keyboards",
      image: "/placeholder.svg?height=400&width=400&text=Pianist",
      bio: "Accomplished pianist with a deep understanding of jazz harmony and contemporary musical styles.",
    },
    {
      name: "Collaborator 2",
      role: "Drums, Percussion",
      image: "/placeholder.svg?height=400&width=400&text=Drummer",
      bio: "Dynamic drummer known for innovative rhythmic approaches and seamless genre transitions.",
    },
    {
      name: "Collaborator 3",
      role: "Guitar, Vocals",
      image: "/placeholder.svg?height=400&width=400&text=Guitarist",
      bio: "Versatile guitarist and vocalist, adding melodic depth and harmonic richness to the ensemble.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
            MUSICAL COLLABORATORS
          </h2>
          <div className="w-32 h-px bg-white mx-auto mb-8"></div>
          <p className="font-vietnam text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Meet the talented musicians who bring these compositions to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bandMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group backdrop-blur-sm"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                  {member.name.toUpperCase()}
                </h3>
                <p className="font-vietnam text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="font-vietnam text-sm text-white/60 leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BandsSection

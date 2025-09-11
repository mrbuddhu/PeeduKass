import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"

const GigsSection = () => {
  const upcomingGigs = [
    {
      id: 1,
      date: "2025-01-15",
      time: "20:00",
      venue: "Tallinn Jazz Club",
      city: "Tallinn, Estonia",
      title: "Winter Jazz Sessions",
      description:
        "An intimate evening featuring original compositions and jazz standards with special guest musicians.",
      ticketLink: "#",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2025-02-03",
      time: "19:30",
      venue: "Tartu Music Hall",
      city: "Tartu, Estonia",
      title: "Contemporary Bass Showcase",
      description: "A solo performance exploring the boundaries of contemporary bass playing and composition.",
      ticketLink: "#",
      status: "upcoming",
    },
    {
      id: 3,
      date: "2025-02-20",
      time: "21:00",
      venue: "Pärnu Concert Hall",
      city: "Pärnu, Estonia",
      title: "Collaborative Evening",
      description: "Performing with local musicians in a celebration of Estonian jazz and contemporary music.",
      ticketLink: "#",
      status: "upcoming",
    },
    {
      id: 4,
      date: "2024-12-10",
      time: "20:30",
      venue: "Viljandi Cultural Centre",
      city: "Viljandi, Estonia",
      title: "Autumn Melodies",
      description: "A retrospective performance featuring compositions from the past year.",
      ticketLink: "#",
      status: "past",
    },
    {
      id: 5,
      date: "2024-11-22",
      time: "19:00",
      venue: "Rakvere Theatre",
      city: "Rakvere, Estonia",
      title: "Educational Workshop & Performance",
      description: "Masterclass followed by an evening performance with student musicians.",
      ticketLink: "#",
      status: "past",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const upcomingEvents = upcomingGigs.filter((gig) => gig.status === "upcoming")
  const pastEvents = upcomingGigs.filter((gig) => gig.status === "past")

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((gig) => (
              <Card key={gig.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    {/* Date & Time */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-vietnam text-sm font-medium text-gray-600">{formatDate(gig.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-vietnam text-sm text-gray-600">{gig.time}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="lg:col-span-2">
                      <h3 className="font-playfair text-xl font-semibold text-black mb-2">{gig.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-vietnam text-sm font-medium text-gray-600">
                          {gig.venue}, {gig.city}
                        </span>
                      </div>
                      <p className="font-vietnam text-gray-600 leading-relaxed">{gig.description}</p>
                    </div>

                    {/* Action */}
                    <div className="lg:col-span-1 flex justify-end">
                      <Button className="flex items-center gap-2">
                        <span>Get Tickets</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8">Recent Performances</h2>
          <div className="space-y-4">
            {pastEvents.map((gig) => (
              <Card key={gig.id} className="overflow-hidden opacity-75">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* Date & Time */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-vietnam text-sm font-medium text-gray-500">{formatDate(gig.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-vietnam text-sm text-gray-500">{gig.time}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="lg:col-span-2">
                      <h3 className="font-playfair text-xl font-semibold text-gray-700 mb-2">{gig.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-vietnam text-sm font-medium text-gray-500">
                          {gig.venue}, {gig.city}
                        </span>
                      </div>
                      <p className="font-vietnam text-gray-500 leading-relaxed">{gig.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GigsSection

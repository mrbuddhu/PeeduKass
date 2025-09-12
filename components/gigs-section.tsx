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
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8">Upcoming Concerts</h2>

        <div className="divide-y divide-gray-200">
          {upcomingEvents.map((gig) => (
            <div key={gig.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-vietnam text-sm">{formatDate(gig.date)}</span>
                <Clock className="h-4 w-4 text-gray-400 hidden md:inline" />
                <span className="font-vietnam text-sm hidden md:inline">{gig.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-vietnam text-sm">
                  {gig.city} — {gig.venue}
                </span>
              </div>
              {gig.ticketLink && (
                <a
                  href={gig.ticketLink}
                  className="ml-auto inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tickets <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        <h3 className="font-playfair text-2xl font-semibold text-black mt-12 mb-6">Past Concerts</h3>
        <div className="divide-y divide-gray-100 opacity-80">
          {pastEvents.map((gig) => (
            <div key={gig.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-vietnam text-sm">{formatDate(gig.date)}</span>
                <Clock className="h-4 w-4 text-gray-300 hidden md:inline" />
                <span className="font-vietnam text-sm hidden md:inline">{gig.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="font-vietnam text-sm">
                  {gig.city} — {gig.venue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GigsSection

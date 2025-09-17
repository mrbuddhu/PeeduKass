"use client"

import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { useLanguage } from "./language-context"

const GigsSection = () => {
  const { t, language } = useLanguage()
  const upcomingGigs = [
    {
      id: 1,
      date: "2025-09-15",
      time: "19:00",
      venue: "Folk Music Center",
      city: "Viljandi, EE",
      title: "Kass/Talsi/Sink/Minn",
      description: "Trio Kass–Talsi–Minn with Theodor Sink.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2025-09-19",
      time: "19:00",
      venue: "Salme Kultuurikeskus",
      city: "Tallinn, EE",
      title: "Miljardid",
      description: "Miljardid in concert.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 3,
      date: "2025-10-25",
      time: "20:00",
      venue: "Tampere-talo, WOMEX",
      city: "Tampere, FI",
      title: "Kass/Talsi/Minn — WOMEX Showcase",
      description: "WOMEX showcase performance.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 4,
      date: "2025-11-27",
      time: "19:00",
      venue: "Haapsalu Kultuurikeskus",
      city: "Haapsalu, EE",
      title: "Võigemast/Käärnamets/Kass",
      description: "JÕULUJAZZ concert.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 5,
      date: "2025-11-29",
      time: "19:00",
      venue: "Von Krahl",
      city: "Tallinn, EE",
      title: "Raivo Tafenau & Lauri Saatpalu",
      description: "JÕULUJAZZ at Von Krahl.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 6,
      date: "2025-11-30",
      time: "19:00",
      venue: "JÕULUJAZZ",
      city: "Jõgeva, EE",
      title: "Maarja Aarma",
      description: "JÕULUJAZZ in Jõgeva.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 7,
      date: "2025-12-02",
      time: "19:00",
      venue: "Kumu auditoorium",
      city: "Tallinn, EE",
      title: "Maarja Aarma",
      description: "JÕULUJAZZ at Kumu auditorium.",
      ticketLink: "",
      status: "upcoming",
    },
    {
      id: 8,
      date: "2025-12-09",
      time: "19:00",
      venue: "Kumu auditoorium",
      city: "Tallinn, EE",
      title: "Võigemast/Käärnamets/Kass",
      description: "JÕULUJAZZ at Kumu auditorium.",
      ticketLink: "",
      status: "upcoming",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const isEstonian = language === "est"
    const locale = isEstonian ? "et-EE" : "en-GB"
    return date.toLocaleDateString(locale, isEstonian
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : { year: "numeric", month: "long", day: "numeric" }
    )
  }

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const today = startOfDay(new Date())

  const upcomingEvents = upcomingGigs
    .filter((gig) => new Date(gig.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = upcomingGigs
    .filter((gig) => new Date(gig.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 animate-fade-in-up">{t("calendar.gigs.upcoming")}</h2>

        <div className="divide-y divide-gray-200">
          {upcomingEvents.map((gig, index) => (
            <div 
              key={gig.id} 
              className="py-4 grid grid-cols-1 md:grid-cols-[200px_max-content_1fr] gap-6 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="flex items-center gap-3 text-gray-700 justify-center text-center md:justify-start md:text-left">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-vietnam text-sm">{formatDate(gig.date)}</span>
                <Clock className="h-4 w-4 text-gray-400 hidden md:inline" />
                <span className="font-vietnam text-sm hidden md:inline">{gig.time}</span>
              </div>
              <div className="flex items-center justify-center text-center md:justify-start md:text-left">
                <span className="font-vietnam text-xs md:text-sm bg-black text-white rounded px-3 py-1 whitespace-nowrap">
                  {gig.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-800 min-w-0 justify-center text-center md:justify-end md:text-right">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-vietnam text-sm whitespace-nowrap overflow-hidden text-ellipsis text-right">
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
                  {t("calendar.gigs.tickets")} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        <h3 className="font-playfair text-2xl font-semibold text-black mt-12 mb-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>{t("calendar.gigs.past")}</h3>
        <div className="divide-y divide-gray-100 opacity-80">
          {pastEvents.map((gig, index) => (
            <div 
              key={gig.id} 
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 animate-fade-in-up"
              style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
            >
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

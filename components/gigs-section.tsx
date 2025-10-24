"use client"

import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { useLanguage } from "./language-context"
import { useState, useEffect } from "react"

const GigsSection = () => {
  const { t, language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
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
      title: "Võigemast/Kaarnamets/Kass",
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
      title: "Võigemast/Kaarnamets/Kass",
      description: "JÕULUJAZZ at Kumu auditorium.",
      ticketLink: "",
      status: "upcoming",
    },
  ]

  // Optional external gigs from JSON; fallback to bundled list
  const [externalGigs, setExternalGigs] = useState<typeof upcomingGigs | null>(null)
  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    // Always load English concerts so both languages show identical data
    const load = () => fetch(`/api/content/gigs/en`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { 
        if (mounted && Array.isArray(data)) {
          setExternalGigs(data)
        }
        // Add a minimum loading time to show the loader
        setTimeout(() => {
          if (mounted) setIsLoading(false)
        }, 1000)
      })
      .catch(() => {
        // Even on error, stop loading after a delay
        setTimeout(() => {
          if (mounted) setIsLoading(false)
        }, 1000)
      })
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel("cms")
      bc.onmessage = (e) => { if (e?.data?.type === "updated" && e?.data?.section === "gigs") load() }
    } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener); if (bc) bc.close() }
  }, [language])
  // Always show default gigs + any additional ones from admin panel (remove duplicates by ID)
  const gigsSource = (externalGigs && externalGigs.length ? externalGigs : [])
  const gigs = gigsSource.filter((gig, index, self) => index === self.findIndex(g => g.id === gig.id))

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

  const upcomingEvents = gigs
    .filter((gig) => new Date(gig.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = gigs
    .filter((gig) => new Date(gig.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">{t("calendar.gigs.upcoming")}</h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Musical note loader */}
            <div className="relative mb-8">
              <div className="flex space-x-2">
                <div className="w-2 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                <div className="w-2 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
            
            {/* Loading text with typewriter effect */}
            <div className="text-center">
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">Loading Concerts</h3>
              <p className="font-vietnam text-white/80 text-lg">Preparing your musical journey...</p>
            </div>
            
            {/* Progress dots */}
            <div className="flex space-x-2 mt-6">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
          {upcomingEvents.map((gig, index) => (
            <div 
              key={gig.id} 
              className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-[250px_auto_1fr_auto] gap-6 cursor-pointer group relative"
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
                <span className="font-vietnam text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {gig.city} — {gig.venue}
                </span>
              </div>
              <div className="flex items-center justify-center text-center md:justify-end md:text-right">
                {gig.ticketLink && (
                  <a
                    href={gig.ticketLink}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("calendar.gigs.tickets")} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-playfair text-2xl font-semibold text-white mt-12 mb-6 drop-shadow-lg">{t("calendar.gigs.past")}</h3>
        <div className="space-y-4">
          {pastEvents.map((gig, index) => (
            <div 
              key={gig.id} 
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-[250px_auto_1fr_auto] gap-6 opacity-80 cursor-pointer group relative"
            >
              <div className="flex items-center gap-3 text-gray-600 justify-center text-center md:justify-start md:text-left">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-vietnam text-sm">{formatDate(gig.date)}</span>
                <Clock className="h-4 w-4 text-gray-300 hidden md:inline" />
                <span className="font-vietnam text-sm hidden md:inline">{gig.time}</span>
              </div>
              <div className="flex items-center justify-center text-center md:justify-start md:text-left">
                <span className="font-vietnam text-xs md:text-sm bg-gray-200 text-gray-800 rounded px-3 py-1 whitespace-nowrap">
                  {gig.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 min-w-0 justify-center text-center md:justify-end md:text-right">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="font-vietnam text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {gig.city} — {gig.venue}
                </span>
              </div>
              <div className="flex items-center justify-center text-center md:justify-end md:text-right">
                {gig.ticketLink && (
                  <a
                    href={gig.ticketLink}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t("calendar.gigs.tickets")}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default GigsSection

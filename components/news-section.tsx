"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "./language-context"
import { useEffect, useState } from "react"

const NewsSection = () => {
  const { t } = useLanguage()
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const defaults = [
    {
      id: 1,
      date: t("news.item1.date"),
      title: t("news.item1.title"),
      content: t("news.item1.content"),
      image: "/wmx25_Kass-Talsi-Minn_Northern_Connections_post_1080x1350.png",
      link: t("news.item1.link"),
      type: "news",
    },
    {
      id: 2,
      date: t("news.item3.date"),
      title: t("news.item3.title"),
      content: t("news.item3.content"),
      image: "/placeholder-e024j.png",
      link: t("news.item3.link"),
      type: "instagram",
    },
    {
      id: 3,
      date: t("news.item2.date"),
      title: t("news.item2.title"),
      content: t("news.item2.content"),
      image: "/ood metsale mockup.jpeg",
      link: t("news.item2.link"),
      type: "news",
    },
  ]

  const [external, setExternal] = useState<typeof defaults | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => fetch("/content/news.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (mounted && Array.isArray(data)) setExternal(data) })
      .catch(() => {})
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    try {
      const bc = new BroadcastChannel("cms")
      bc.onmessage = (e) => { if (e?.data?.type === "updated") load() }
    } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener) }
  }, [])

  // Prefer admin items over defaults when IDs collide
  const newsItems = [...(external || []), ...defaults].filter((item, index, self) => index === self.findIndex(i => i.id === item.id))

  // Load external JSON with state so UI updates immediately after save
  const [externalItems, setExternalItems] = useState<typeof newsItems | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => {
      fetch("/content/news.json", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (mounted && Array.isArray(data) && data.length > 0) {
            setExternalItems(data)
          }
        })
        .catch(() => {})
    }
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    try {
      const bc = new BroadcastChannel("cms")
      bc.onmessage = (e) => { if (e?.data?.type === "updated") load() }
    } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener) }
  }, [])
  // Always show all 3 default news items + any additional ones from admin panel (remove duplicates by ID)
  const allItems = [...newsItems, ...(externalItems || [])]
  const itemsToRender = allItems.filter((item, index, self) => 
    index === self.findIndex(i => i.id === item.id)
  )

  return (
    <section className="py-24 px-6">
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16">

          {/* Render all cards; grid auto-wraps in 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {itemsToRender.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white group p-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  {item.type === "instagram" && item.link && item.link.includes("instagram.com") ? (
                    <iframe
                      src={`${item.link}/embed/`}
                      className="w-full h-full border-0"
                      scrolling="no"
                      allow="encrypted-media"
                      title={item.title}
                      frameBorder="0"
                    />
                  ) : (
                    <>
                      {/* Blurred background */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
                      />
                      {/* Main image */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 z-10"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-20" />
                    </>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {item.type !== "instagram" && item.date && (
                      <>
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-vietnam text-sm text-gray-500 uppercase tracking-wide">{item.date}</span>
                      </>
                    )}
                    {item.type === "instagram" && (
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                        {t("news.instagram")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-black mb-4 leading-tight">
                    {item.title}
                  </h3>
                  {item.content && expandedCards.has(item.id) && (
                    <p className="font-vietnam text-gray-600 mb-6 leading-relaxed text-lg">{item.content}</p>
                  )}
                  {item.link && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2 bg-transparent border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide font-vietnam"
                      onClick={() => {
                        if (item.type === "instagram") {
                          window.open("https://www.instagram.com/peedu07", '_blank')
                        } else if (item.type === "news") {
                          toggleCard(item.id)
                        } else {
                          window.open(item.link, '_blank')
                        }
                      }}
                    >
                      <span>
                        {item.type === "instagram" 
                          ? "Visit Profile" 
                          : item.type === "news"
                            ? (expandedCards.has(item.id) ? "Show Less" : t("news.readMore"))
                            : t("news.readMore")
                        }
                      </span>
                      {item.type === "instagram" ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : item.type === "news" ? (
                        expandedCards.has(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* End cards */}
        </div>
      </div>
    </section>
  )
}

export default NewsSection

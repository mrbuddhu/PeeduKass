"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "./language-context"
import { useState } from "react"

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

  const newsItems = [
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
    {
      id: 4,
      date: t("news.item4.date"),
      title: t("news.item4.title"),
      content: t("news.item4.content"),
      image: "/placeholder-ta3cn.png",
      link: t("news.item4.link"),
      type: "instagram",
    },
    {
      id: 5,
      date: t("news.item5.date"),
      title: t("news.item5.title"),
      content: t("news.item5.content"),
      image: "/placeholder-logo.png",
      link: t("news.item5.link"),
      type: "instagram",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16">

          {/* First Row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {newsItems.slice(0, 3).map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white group p-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  {item.type === "instagram" ? (
                    <iframe
                      src={`${item.link}/embed/`}
                      className="w-full h-full border-0"
                      scrolling="no"
                      allowTransparency={true}
                      title={item.title}
                      frameBorder="0"
                      allow="encrypted-media"
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
                        } else if (item.content) {
                          toggleCard(item.id)
                        } else {
                          window.open(item.link, '_blank')
                        }
                      }}
                    >
                      <span>
                        {item.type === "instagram" 
                          ? "Visit Profile" 
                          : item.content 
                            ? (expandedCards.has(item.id) ? "Show Less" : t("news.readMore"))
                            : t("news.readMore")
                        }
                      </span>
                      {item.type === "instagram" ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : item.content ? (
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

          {/* Second Row hidden per request */}
        </div>
      </div>
    </section>
  )
}

export default NewsSection

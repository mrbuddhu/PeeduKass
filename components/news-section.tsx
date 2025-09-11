"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink } from "lucide-react"
import { useLanguage } from "./language-context"

const NewsSection = () => {
  const { t } = useLanguage()

  const newsItems = [
    {
      id: 1,
      date: t("news.item1.date"),
      title: t("news.item1.title"),
      content: t("news.item1.content"),
      image: "/placeholder-p0tu2.png",
      link: "#",
      type: "announcement",
    },
    {
      id: 2,
      date: t("news.item2.date"),
      title: t("news.item2.title"),
      content: t("news.item2.content"),
      image: "/placeholder-1sash.png",
      link: "#",
      type: "news",
    },
    {
      id: 3,
      date: t("news.item3.date"),
      title: t("news.item3.title"),
      content: t("news.item3.content"),
      image: "/placeholder-e024j.png",
      link: "https://instagram.com",
      type: "instagram",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-wide">
              {t("news.title")}
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8"></div>
            <p className="font-vietnam text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
              {t("news.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {newsItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white group"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-vietnam text-sm text-gray-500 uppercase tracking-wide">{item.date}</span>
                    {item.type === "instagram" && (
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                        {t("news.instagram")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-vietnam text-gray-600 mb-6 leading-relaxed text-lg">{item.content}</p>
                  {item.link && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2 bg-transparent border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide font-vietnam"
                    >
                      <span>{t("news.readMore")}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsSection

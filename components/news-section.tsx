"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "./language-context"
import { useEffect, useState } from "react"

const NewsSection = () => {
  const { t } = useLanguage()
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [instagramLoaded, setInstagramLoaded] = useState<Set<number>>(new Set())
  const [instagramFailed, setInstagramFailed] = useState<Set<number>>(new Set())

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
    const load = () => {
      fetch("/content/news.json", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => { 
          if (mounted && Array.isArray(data)) {
            setExternal(data)
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
    
    return () => { 
      mounted = false
      window.removeEventListener("cms:content-updated", handler as EventListener) 
    }
  }, [])

  // Use external data if available, otherwise use defaults
  const itemsToRender = external || defaults

  // Monitor Instagram embeds and switch to fallback if they disappear
  useEffect(() => {
    const checkInstagramEmbeds = () => {
      const instagramCards = document.querySelectorAll('.instagram-media')
      instagramCards.forEach((card, index) => {
        const cardElement = card as HTMLElement
        // Check if the embed is empty or has no content
        if (cardElement.offsetHeight < 50 || cardElement.innerHTML.trim().length < 100) {
          // Find the corresponding news item ID and mark as failed
          const newsItem = itemsToRender.find((item, idx) => item.type === "instagram" && idx === index)
          if (newsItem) {
            setInstagramFailed(prev => new Set(prev).add(newsItem.id))
          }
        }
      })
    }

    // Check immediately and then every 2 seconds
    checkInstagramEmbeds()
    const interval = setInterval(checkInstagramEmbeds, 2000)

    return () => clearInterval(interval)
  }, [itemsToRender])

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
                    <div className="w-full h-full relative">
                      {/* Try Instagram embed first */}
                      {!instagramFailed.has(item.id) && (
                        <div 
                          className="w-full h-full overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: `<blockquote class="instagram-media" data-instgrm-permalink="${item.link}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 0; max-width:100%; min-width:100%; padding:0; width:100%; height:100%;"><div style="padding:16px;"> <a href="${item.link}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="${item.link}" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">${item.title}</a></p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>`
                          }}
                          onError={() => setInstagramFailed(prev => new Set(prev).add(item.id))}
                        />
                      )}
                      
                      {/* Fallback Instagram card when embed fails */}
                      {instagramFailed.has(item.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                          <div className="text-center text-white p-6">
                            <div className="mb-4">
                              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Instagram Post</h3>
                            <p className="text-sm opacity-90 mb-4">{item.title}</p>
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                              View on Instagram
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
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

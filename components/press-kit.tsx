"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, ImageIcon, Music } from "lucide-react"
import { useLanguage } from "./language-context"
import { useEffect, useState } from "react"

const PressKit = () => {
  const { t } = useLanguage()
  const [sizes, setSizes] = useState<Record<string, string>>({})
  const defaults = [
    {
      title: t("press.kit.complete"),
      description: "",
      type: "PDF",
      size: "3.4 MB",
      icon: <FileText className="h-6 w-6" />,
      downloadUrl: "/press-kit/Peedu Kass EPK.pdf",
    },
  ]

  const [external, setExternal] = useState<typeof defaults | null>(null)
  useEffect(() => {
    let mounted = true
    const load = () => fetch("/content/press-kit.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (mounted && Array.isArray(data)) setExternal(data) })
      .catch(() => {})
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    try { const bc = new BroadcastChannel("cms"); bc.onmessage = (e) => { if (e?.data?.type === "updated") load() } } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener) }
  }, [])

  const pressItems = external || defaults

  useEffect(() => {
    const formatBytes = (bytes: number) => {
      if (!bytes || isNaN(bytes)) return ""
      const mb = bytes / (1024 * 1024)
      return `${mb.toFixed(1)} MB`
    }
    const fetchSizes = async () => {
      const results: Record<string, string> = {}
      await Promise.all(
        pressItems.map(async (item) => {
          try {
            if (!item.downloadUrl || item.downloadUrl === "#") return
            const res = await fetch(item.downloadUrl, { method: "HEAD" })
            const len = res.headers.get("content-length")
            if (len) results[item.downloadUrl] = formatBytes(parseInt(len, 10))
          } catch (e) {}
        })
      )
      if (Object.keys(results).length) setSizes(results)
    }
    fetchSizes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pressItems.map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-up cursor-pointer" 
              style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
              onClick={() => {
                if (item.downloadUrl !== "#") {
                  const link = document.createElement('a');
                  link.href = item.downloadUrl;
                  link.download = item.downloadUrl.split('/').pop() || 'download';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-semibold text-black mb-2">{item.title}</h3>
                    {item.description ? (
                      <p className="font-vietnam text-gray-600 mb-3">{item.description}</p>
                    ) : null}
                    <div className="flex items-center justify-between">
                      <span className="font-vietnam text-sm text-gray-500">
                        {item.type} • {sizes[item.downloadUrl] || item.size}
                      </span>
                      <Button 
                        size="sm" 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          if (item.downloadUrl !== "#") {
                            const link = document.createElement('a');
                            link.href = item.downloadUrl;
                            link.download = item.downloadUrl.split('/').pop() || 'download';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                        }}
                      >
                        <Download className="h-4 w-4" />
                        {t("press.kit.download")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Facts */}
        <Card className="bg-gray-50 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-8">
            <h3 className="font-playfair text-2xl font-bold text-black mb-6 text-center">{t("press.kit.quickFacts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.genre")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.genreValue")}</p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.instrument")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.instrumentValue")}</p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.location")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.locationValue")}</p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.experience")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.experienceValue")}</p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "1.0s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.languages")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.languagesValue")}</p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.contact")}</h4>
                <p className="font-vietnam text-gray-600">{t("press.kit.contactValue")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PressKit

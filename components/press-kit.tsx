"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, ImageIcon, Music } from "lucide-react"
import { useLanguage } from "./language-context"

const PressKit = () => {
  const { t } = useLanguage()
  const pressItems = [
    {
      title: t("press.kit.complete"),
      description: t("press.kit.completeDesc"),
      type: "PDF",
      size: "2.4 MB",
      icon: <FileText className="h-6 w-6" />,
      downloadUrl: "#",
    },
    {
      title: t("press.kit.photos"),
      description: t("press.kit.photosDesc"),
      type: "ZIP",
      size: "15.2 MB",
      icon: <ImageIcon className="h-6 w-6" />,
      downloadUrl: "#",
    },
    {
      title: t("press.kit.audio"),
      description: t("press.kit.audioDesc"),
      type: "ZIP",
      size: "45.8 MB",
      icon: <Music className="h-6 w-6" />,
      downloadUrl: "#",
    },
    {
      title: t("press.kit.rider"),
      description: t("press.kit.riderDesc"),
      type: "PDF",
      size: "1.1 MB",
      icon: <FileText className="h-6 w-6" />,
      downloadUrl: "#",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pressItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-semibold text-black mb-2">{item.title}</h3>
                    <p className="font-vietnam text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-vietnam text-sm text-gray-500">
                        {item.type} • {item.size}
                      </span>
                      <Button size="sm" className="flex items-center gap-2">
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
        <Card className="bg-gray-50">
          <CardContent className="p-8">
            <h3 className="font-playfair text-2xl font-bold text-black mb-6 text-center">{t("press.kit.quickFacts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.genre")}</h4>
                <p className="font-vietnam text-gray-600">Jazz, Contemporary, Fusion</p>
              </div>
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.instrument")}</h4>
                <p className="font-vietnam text-gray-600">Bass Guitar, Double Bass</p>
              </div>
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.location")}</h4>
                <p className="font-vietnam text-gray-600">Estonia</p>
              </div>
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.experience")}</h4>
                <p className="font-vietnam text-gray-600">20+ Years</p>
              </div>
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.languages")}</h4>
                <p className="font-vietnam text-gray-600">Estonian, English</p>
              </div>
              <div className="text-center">
                <h4 className="font-vietnam font-semibold text-black mb-2">{t("press.kit.contact")}</h4>
                <p className="font-vietnam text-gray-600">info@peedukass.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PressKit

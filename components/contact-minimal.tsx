"use client"

import { Mail, Phone, Instagram, Youtube, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-context"

const ContactMinimal = () => {
  const { t } = useLanguage()

  const user = "info"
  const domain = "peedukass"
  const tld = "com"
  const obfuscated = `${user} [at] ${domain} [dot] ${tld}`

  const handleEmailClick = () => {
    window.location.href = `mailto:${user}@${domain}.${tld}`
  }

  return (
    <section className="min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] bg-white text-black flex items-center justify-center px-6">
      <Card className="w-full max-w-md mx-auto border border-gray-200 shadow-sm rounded-xl">
        <CardContent className="p-8 md:p-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <button
                onClick={handleEmailClick}
                className="font-vietnam text-lg md:text-xl hover:underline"
                aria-label="Send email"
              >
                {obfuscated}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <a href="tel:+3725204970" className="font-vietnam text-lg md:text-xl hover:underline">
                +372 520 4970
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="font-vietnam text-base md:text-lg">{t("footer.location")}</span>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <a
                href="https://www.instagram.com/peedu07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/peedu07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ContactMinimal



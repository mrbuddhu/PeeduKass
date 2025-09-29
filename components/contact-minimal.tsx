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
    <section className="relative min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
      <img
        src="/contactpagebackground.webp"
        alt="Contact page background"
        className="absolute inset-0 w-full h-full object-cover object-[right_top] md:object-[center_top]"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative w-full max-w-md mx-auto text-white">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Mail className="h-5 w-5" />
            <button
              onClick={handleEmailClick}
              className="font-vietnam text-lg md:text-xl hover:underline"
              aria-label="Send email"
            >
              {obfuscated}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Phone className="h-5 w-5" />
            <a href="tel:+3725204970" className="font-vietnam text-lg md:text-xl hover:underline">
              +372 520 4970
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <MapPin className="h-5 w-5" />
            <span className="font-vietnam text-base md:text-lg">{t("footer.location")}</span>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://www.instagram.com/peedu07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/80 hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/peedu07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white/80 hover:text-red-400 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMinimal



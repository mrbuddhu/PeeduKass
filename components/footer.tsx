"use client"

import Link from "next/link"
import { useLanguage } from "./language-context"

const Footer = () => {
  const { t, language } = useLanguage()

  const tagline = t("footer.tagline")
  const artisticIdx = language === "en" ? tagline.toLowerCase().indexOf("artistic director") : -1

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="col-span-1 lg:col-span-1">
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-black mb-3 tracking-wide">Peedu Kass</h3>
          <p className="font-vietnam text-sm text-gray-600 leading-relaxed max-w-md md:max-w-lg lg:max-w-xl">
            {language === "en" && artisticIdx > -1 ? (
              <>
                {tagline.slice(0, artisticIdx).trim()}
                <br className="hidden lg:block" />
                {" "}
                {tagline.slice(artisticIdx).trim()}
              </>
            ) : (
              tagline
            )}
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="font-vietnam text-[11px] font-semibold uppercase tracking-[0.18em] text-black/80 mb-3">
            {t("footer.navigation")}
          </h4>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-6 font-vietnam text-sm">
            <li>
              <Link href="/about" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.calendar")}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.gallery")}
              </Link>
            </li>
            <li>
              <Link href="/audio" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.audio")}
              </Link>
            </li>
            <li>
              <Link href="/press" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.press")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 hover:text-black hover:underline underline-offset-4">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-vietnam text-[11px] font-semibold uppercase tracking-[0.18em] text-black/80 mb-3">
            {t("footer.contact")}
          </h4>
          <div className="space-y-1.5">
            <p className="font-vietnam text-sm text-gray-700">info@peedukass.com</p>
            <p className="font-vietnam text-sm text-gray-700">{t("footer.location")}</p>
          </div>
        </div>
        <div className="col-span-1 flex items-start lg:justify-end">
          <div className="text-left lg:text-right">
            <p className="font-vietnam text-xs text-gray-500">© {new Date().getFullYear()} Peedu Kass</p>
            <p className="font-vietnam text-xs text-gray-500">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer



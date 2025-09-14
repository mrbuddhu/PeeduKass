"use client"

import { useLanguage } from "./language-context"

const GalleryHero = () => {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 animate-fade-in-up">{t("gallery.hero.title")}</h1>
        <p className="font-vietnam text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t("gallery.hero.subtitle")}
        </p>
      </div>
    </section>
  )
}

export default GalleryHero

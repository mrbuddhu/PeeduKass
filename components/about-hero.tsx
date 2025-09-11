"use client"

import { useLanguage } from "./language-context"

const AboutHero = () => {
  const { t } = useLanguage()
  return (
    <section className="relative py-32 px-6 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Abstract+Musical+Pattern')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-wide">{t("about.hero.title")}</h1>
        <div className="w-32 h-px bg-white mx-auto mb-12"></div>
        <p className="font-vietnam text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
          {t("about.hero.subtitle")}
        </p>
      </div>
    </section>
  )
}

export default AboutHero

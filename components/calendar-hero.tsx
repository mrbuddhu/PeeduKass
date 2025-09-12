"use client"

import { useLanguage } from "./language-context"

const CalendarHero = () => {
  const { t } = useLanguage()
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-black">{t("calendar.hero.title")}</h1>
      </div>
    </section>
  )
}

export default CalendarHero

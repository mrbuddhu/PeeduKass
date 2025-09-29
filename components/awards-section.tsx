"use client"

import { useLanguage } from "./language-context"
import { useEffect, useState } from "react"

const awards = {
  en: [
    "2006 — Grand Prix 'Sony Jazz Stage' Riga, Latvia",
    "2010 — Estonian Jazz Awards — Young Jazz Talent",
    "2010 — Uno Naissoo Song Writing Competition",
    "2017 — Estonian Jazz Awards — Jazz Ensemble of the Year — Peedu Kass Momentum",
    "2018 — Estonian Music Awards — Debut Album of the Year, Rock Album of the Year, Album of the Year — Miljardid 'Kunagi läänes'",
    "2018 — Estonian Music Awards — Jazz Album of the Year — Reigo Ahven Trio 'Remember'",
    "2021 — Estonian Music Awards — Rock Album of the Year — Miljardid 'Ma luban, et ma muutun'",
    "2022 — Estonian Jazz Awards — Jazz Composer of the Year",
  ],
  est: [
    "2006 — Grand Prix 'Sony Jazz Stage' Riia, Läti",
    "2010 — Eesti Jazziauhinnad - Noor Jazzitalent",
    "2010 — Uno Naissoo nimeline heliloomingu konkurss",
    "2017 — Eesti Jazziauhinnad - Aasta Jazzansambel - Peedu Kass Momentum",
    "2018 — Eesti Muusikaauhinnad - Aasta debüütalbum, Aasta rockalbum, Aasta album - Miljardid \"Kunagi läänes\"",
    "2018 — Eesti Muusikaauhinnad - Aasta jazzalbum - Reigo Ahven Trio \"Remember\"",
    "2021 — Eesti Muusikaauhinnad - Aasta rockalbum - Miljardid \"Ma luban, et ma muutun\"",
    "2022 — Eesti Jazziauhinnad - Aasta Jazzihelilooja",
  ]
}

const AwardsSection = () => {
  const { language } = useLanguage()
  const [cmsAwards, setCmsAwards] = useState<string[] | null>(null)

  useEffect(() => {
    let mounted = true
    const path = language === "en" ? "/content/awards.json" : "/content/awards_est.json"
    const load = () => fetch(path, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (mounted && Array.isArray(data)) setCmsAwards(data.map((x: any) => x.text || "")) })
      .catch(() => {})
    load()
    const handler = () => load()
    window.addEventListener("cms:content-updated", handler as EventListener)
    try { const bc = new BroadcastChannel("cms"); bc.onmessage = (e) => { if (e?.data?.type === "updated") load() } } catch {}
    return () => { mounted = false; window.removeEventListener("cms:content-updated", handler as EventListener) }
  }, [language])
  
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-wide">
            {language === "en" ? "Awards" : "Tunnustused"}
          </h2>
          <div className="w-24 h-px bg-black/90 mx-auto mt-6" />
          <p className="text-gray-600 mt-4 text-sm font-vietnam">
            {language === "en" ? "Selected recognitions and prizes" : ""}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
        <ul className="list-disc pl-6 space-y-3 text-black tracking-wide text-base md:text-lg font-vietnam marker:text-gray-400">
          {(cmsAwards || awards[language]).map((item, idx) => (
            <li
              key={idx}
              className="leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.06 * idx}s` }}
            >
              {item}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  )
}

export default AwardsSection
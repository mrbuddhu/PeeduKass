"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "est"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Footer
    "footer.tagline": "Nordic jazz, roots and modern grooves",
    "footer.navigation": "Navigation",
    "footer.contact": "Contact",
    "footer.location": "Tallinn, Estonia",
    "footer.rights": "All rights reserved",
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.calendar": "Calendar",
    "nav.gallery": "Gallery",
    "nav.audio": "Audio",
    "nav.press": "Press Kit",
    "nav.contact": "Contact",

    // Hero Section
    "hero.name": "PEEDU KASS",
    "hero.intro": "Peedu Kass is an acclaimed bassist, composer and educator from Estonia",
    "hero.intro.est": "Muusik, bassimängija, helilooja ja õpetaja – Peedu Kass",

    // News Section
    "news.title": "Latest News",
    "news.subtitle": "Stay updated with recent performances, releases, and musical journeys",
    "news.readMore": "Read More",
    "news.instagram": "Instagram",
    "news.item1.date": "March 15, 2024",
    "news.item1.title": "New Album Release",
    "news.item1.content":
      "Excited to announce the release of my latest album 'Nordic Reflections', featuring collaborations with renowned Estonian musicians.",
    "news.item2.date": "February 28, 2024",
    "news.item2.title": "European Tour Announcement",
    "news.item2.content": "Join me on a journey across Europe this spring. Tour dates now available for booking.",
    "news.item3.date": "January 20, 2024",
    "news.item3.title": "Teaching Workshop Series",
    "news.item3.content":
      "New bass masterclass series starting in Tallinn. Limited spots available for advanced students.",

    // About Page
    "about.hero.title": "About Peedu Kass",
    "about.hero.subtitle": "A Journey Through Music",
    "about.bio.title": "Biography",
    "about.bio.content":
      "Peedu Kass is a distinguished Estonian bassist, composer, and educator whose musical journey spans over two decades. Born and raised in Estonia, Peedu developed his passion for music at an early age, eventually becoming one of the most respected bass players in the Nordic music scene.\n\nHis unique approach to the bass guitar combines traditional Estonian folk influences with contemporary jazz and progressive rock elements. This distinctive style has earned him recognition both locally and internationally, leading to collaborations with renowned artists across Europe.\n\nAs an educator, Peedu is committed to nurturing the next generation of musicians. He regularly conducts masterclasses and workshops, sharing his expertise and passion for music with students of all levels.",
    "about.bands.title": "Musical Projects",
    "about.bands.current": "Current Projects",
    "about.bands.past": "Past Collaborations",

    // Calendar Page
    "calendar.hero.title": "Upcoming Shows",
    "calendar.hero.subtitle": "Live Performances & Events",
    "calendar.gigs.title": "Concert Calendar",

    // Gallery Page
    "gallery.hero.title": "Photos & Videos",
    "gallery.hero.subtitle": "Moments from the Stage",
    "gallery.photos.title": "Photo Gallery",
    "gallery.videos.title": "Video Gallery",

    // Audio Page
    "audio.hero.title": "Listen",
    "audio.hero.subtitle": "Latest Recordings & Releases",
    "audio.player.title": "Featured Tracks",
    "audio.streaming.title": "Available on Streaming Platforms",

    // Press Kit Page
    "press.hero.title": "Press Kit",
    "press.hero.subtitle": "Media Resources & Information",
    "press.kit.title": "Download Press Materials",
    "press.photos.title": "Press Photos",

    // Contact Page
    "contact.hero.title": "Get in Touch",
    "contact.hero.subtitle": "Bookings, Collaborations & Inquiries",
    "contact.form.title": "Send a Message",
    "contact.info.title": "Contact Information",
    "contact.info.emailDesc": "Best for booking inquiries and collaborations",
    "contact.info.phoneDesc": "Available during business hours (EST)",
    "contact.info.locationDesc": "Available for performances across Europe",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
  },
  est: {
    // Footer
    "footer.tagline": "Põhjamaine džäss, juured ja moodsad rütmid",
    "footer.navigation": "Navigeerimine",
    "footer.contact": "Kontakt",
    "footer.location": "Tallinn, Eesti",
    "footer.rights": "Kõik õigused kaitstud",
    // Navigation
    "nav.home": "Avaleht",
    "nav.about": "Meist",
    "nav.calendar": "Kalender",
    "nav.gallery": "Galerii",
    "nav.audio": "Audio",
    "nav.press": "Pressikomplekt",
    "nav.contact": "Kontakt",

    // Hero Section
    "hero.name": "PEEDU KASS",
    "hero.intro": "Muusik, bassimängija, helilooja ja õpetaja – Peedu Kass",
    "hero.intro.est": "Muusik, bassimängija, helilooja ja õpetaja – Peedu Kass",

    // News Section
    "news.title": "Viimased Uudised",
    "news.subtitle": "Ole kursis esinemiste, väljalasete ja muusikaliste rännakutega",
    "news.readMore": "Loe Veel",
    "news.instagram": "Instagram",
    "news.item1.date": "15. märts 2024",
    "news.item1.title": "Uue Albumi Väljalase",
    "news.item1.content":
      "Põnevusega teatame oma uusima albumi 'Nordic Reflections' väljalaskest, mis sisaldab koostööd tuntud Eesti muusikutega.",
    "news.item2.date": "28. veebruar 2024",
    "news.item2.title": "Euroopa Tuuri Teadaanne",
    "news.item2.content":
      "Liitu minuga sel kevadel Euroopa-üleses reisis. Kontserdikuupäevad on nüüd broneerimiseks saadaval.",
    "news.item3.date": "20. jaanuar 2024",
    "news.item3.title": "Õpetamise Töötubade Seeria",
    "news.item3.content": "Uus bassiõpetuse meistriklass algab Tallinnas. Piiratud kohad edasijõudnud õpilastele.",

    // About Page
    "about.hero.title": "Peedu Kassist",
    "about.hero.subtitle": "Teekond Läbi Muusika",
    "about.bio.title": "Elulugu",
    "about.bio.content":
      "Peedu Kass on tunnustatud Eesti bassimängija, helilooja ja õpetaja, kelle muusikaline teekond ulatub üle kahe aastakümne. Eestis sündinud ja kasvanud Peedu arendas oma kirge muusika vastu varajases eas, saades lõpuks üheks austatuimaks bassimängijaks Põhjamaade muusikaskeenes.\n\nTema ainulaadne lähenemine bassgitarrile ühendab traditsioonilisi Eesti rahvamuusika mõjutusi kaasaegse džässi ja progressiivse rokiga. See eripärane stiil on toonud talle tunnustuse nii kohalikul kui ka rahvusvahelisel tasandil, viies koostööni tuntud artistidega üle Euroopa.\n\nÕpetajana on Peedu pühendunud järgmise muusikupõlvkonna kasvatamisele. Ta viib regulaarselt läbi meistriklasse ja töötube, jagades oma teadmisi ja kirge muusika vastu kõigi tasemete õpilastega.",
    "about.bands.title": "Muusikalised Projektid",
    "about.bands.current": "Praegused Projektid",
    "about.bands.past": "Varasemad Koostööd",

    // Calendar Page
    "calendar.hero.title": "Tulevased Esinemised",
    "calendar.hero.subtitle": "Otseülekanded ja Üritused",
    "calendar.gigs.title": "Kontserdikalender",

    // Gallery Page
    "gallery.hero.title": "Fotod ja Videod",
    "gallery.hero.subtitle": "Hetked Lavalt",
    "gallery.photos.title": "Fotogalerii",
    "gallery.videos.title": "Videogalerii",

    // Audio Page
    "audio.hero.title": "Kuula",
    "audio.hero.subtitle": "Viimased Salvestused ja Väljalasked",
    "audio.player.title": "Esitletud Lood",
    "audio.streaming.title": "Saadaval Voogedastusplatvormidel",

    // Press Kit Page
    "press.hero.title": "Pressikomplekt",
    "press.hero.subtitle": "Meediaressursid ja Informatsioon",
    "press.kit.title": "Laadi Alla Pressimaterjalid",
    "press.photos.title": "Pressifotod",

    // Contact Page
    "contact.hero.title": "Võta Ühendust",
    "contact.hero.subtitle": "Broneeringud, Koostöö ja Päringud",
    "contact.form.title": "Saada Sõnum",
    "contact.info.title": "Kontaktandmed",
    "contact.info.emailDesc": "Parim broneeringute ja koostöö päringute jaoks",
    "contact.info.phoneDesc": "Saadaval tööajal (EET)",
    "contact.info.locationDesc": "Saadaval esinemisteks üle Euroopa",
    "contact.info.follow": "Jälgi sotsiaalmeedias",
    "contact.response.title": "Vastamisaeg",
    "contact.response.text": "Vastan päringutele tavaliselt 24–48 tunni jooksul. Kiireloomuliste broneeringute puhul palun helista.",
    "contact.form.name": "Nimi",
    "contact.form.email": "E-post",
    "contact.form.subject": "Teema",
    "contact.form.message": "Sõnum",
    "contact.form.send": "Saada Sõnum",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

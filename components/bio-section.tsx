"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const BioSection = () => {
  const [language, setLanguage] = useState<"en" | "est">("en")

  const bioContent = {
    en: {
      title: "Biography",
      paragraphs: [
        "Peedu Kass is an acclaimed Estonian bassist, composer, and educator whose musical journey spans over two decades of professional performance and teaching. Born and raised in Estonia, Peedu developed his passion for music at an early age, eventually specializing in jazz and contemporary music.",
        "Throughout his career, Peedu has established himself as one of Estonia's most respected bass players, performing with numerous renowned musicians and ensembles across Europe. His versatility as a musician allows him to seamlessly navigate between jazz, classical, and contemporary genres, bringing a unique perspective to each performance.",
        "As an educator, Peedu is deeply committed to nurturing the next generation of musicians. He has taught at various music institutions and conducts masterclasses, sharing his extensive knowledge of bass technique, improvisation, and musical theory with students of all levels.",
        "His compositions reflect a deep understanding of both traditional jazz harmony and modern musical innovations, creating works that are both accessible and intellectually engaging. Peedu continues to push the boundaries of his artistry while remaining rooted in the rich musical traditions of Estonia.",
      ],
    },
    est: {
      title: "Elulugu",
      paragraphs: [
        "Peedu Kass on tunnustatud Eesti bassimängija, helilooja ja õpetaja, kelle muusikaline teekond hõlmab üle kahe aastakümne professionaalset esinemist ja õpetamist. Eestis sündinud ja kasvanud Peedu arendas muusikaarmastuse varajases eas, spetsialiseerudes lõpuks džässile ja kaasaegsele muusikale.",
        "Oma karjääri jooksul on Peedu kehtestanud end ühe Eesti kõige austatuma bassimängijana, esinedes paljude tunnustatud muusikute ja ansamblitega üle Euroopa. Tema mitmekülgsus muusikuna võimaldab tal sujuvalt navigeerida džässi, klassikalise ja kaasaegse žanri vahel, tuues igasse esinemisse ainulaadse perspektiivi.",
        "Õpetajana on Peedu sügavalt pühendunud järgmise muusikupõlvkonna kasvatamisele. Ta on õpetanud erinevates muusikaasutustes ja viib läbi meistrikursusi, jagades oma ulatuslikke teadmisi bassi tehnikast, improvisatsioonist ja muusikateoorias kõigi tasemete õpilastega.",
        "Tema kompositsioonid peegeldavad sügavat arusaamist nii traditsioonilistest džässharmooniast kui ka kaasaegsetest muusikainnovatsioonidest, luues teoseid, mis on nii kättesaadavad kui ka intellektuaalselt kaasahaaravad. Peedu jätkab oma kunstilisuse piiride laiendamist, jäädes samal ajal juurdunuks Eesti rikkalikesse muusikatraditsiooniidesse.",
      ],
    },
  }

  return (
    <section className="py-24 px-6">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="aspect-[4/5] relative overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=800&width=640&text=Peedu+Kass+Portrait"
                  alt="Peedu Kass Portrait"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="flex items-center gap-6 mb-12">
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-wide">
                  {bioContent[language].title}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setLanguage("en")}
                    className="bg-black text-white hover:bg-gray-800 border-black font-vietnam uppercase tracking-wide"
                  >
                    EN
                  </Button>
                  <Button
                    variant={language === "est" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setLanguage("est")}
                    className="bg-black text-white hover:bg-gray-800 border-black font-vietnam uppercase tracking-wide"
                  >
                    EST
                  </Button>
                </div>
              </div>

              <div className="w-24 h-px bg-black mb-12"></div>

              <div className="space-y-8">
                {bioContent[language].paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BioSection

"use client"

import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const BioSection = () => {
  const [language, setLanguage] = useState<"en" | "est">("en")

  const bioContent = {
    en: {
      title: "Biography",
      paragraphs: [
        "Bassist Peedu Kass moves and grooves with the top names on the Estonian jazz scene and beyond. After garnering the prestigious Young Talent prize (2010) at Estonia's annual Jazzkaar festival, Kass quickly established a reputation as Tallinn's first-call bassist, and his entrée onto the wider European scene was anticipated by his win, at age twenty, of the Sony Jazz Stage award in Riga, Latvia, in a year (2006) in which the competition was focused on his instrument. He has since shared the bandstand with the likes of Django Bates, Marilyn Mazur, Seamus Blake, Tony Allen, Lonnie Liston Smith, Antonio Hart, and the European Jazz Orchestra. His tours have taken him all over Europe and to the United States, Canada, Japan, and Australia, and he has thrilled to the view from the stage of storied jazz festivals (London, Kongsberg, Pori) and clubs (Smalls, New York City; Pit Inn, Tokyo; Vortex, London).",
        "Kass received his bachelor's degree from the Estonian Academy of Music and Theatre and a master's in jazz performance (2014) from the renowned Sibelius Academy in Helsinki, Finland. In addition to lessons with Estonian greats, he has been coached by Matt Penman, Mats Eilertsen, Thomas Morgan, and Anders Jormin. Kass teaches at the Viljandi Culture Academy of Tartu University and is a former chairman of the Estonian Jazz Union.",
        "Renowned for his electric-, acoustic- and synth-bass skills—in performance and in the studio and with ensembles ranging from small groups to full orchestras—Kass has also been expanding into arrangement and composition. Studies with composer Tõnu Kõrvits led to settings for strings and horns, pieces for chamber ensemble, and a commission from the Estonian National Symphony Orchestra, premiered in 2012 at the annual Estonian Music Days festival.",
        "Kass leads several bands, including the piano trio \"Peedu Kass Momentum,\" which won Jazzkaar's \"Jazz Ensemble of the Year\" award in 2017. The first album under his own name, a quintet effort, Home, was released in 2010, followed shortly by Armada in 2012. His latest, Peedu Kass Momentum, was released in April 2016 and was nominated for jazz album of the year at the Estonian Music Awards. When not pursuing music, Kass can be found mountaineering or hiking forgotten trails. He strives for the legibility of strong natural forms in his playing and writing, a legibility always affected, of course, by the ever-changing atmosphere of day and season.",
      ],
    },
    est: {
      title: "Elulugu",
      paragraphs: [
        "Peedu Kass (1986) on hinnatud bassist nii Eesti kui ka Euroopa jazzimaastikul. Tema mängu kuuleb järjest enam ka heliplaatidel väljaspool kodumaad. Ta on kirjutanud muusikat sümfooniaorkestrile, lühifilmile ja mitmetele jazzansamblitele ning tema pillimäng kõlab rohkem kui 20nel plaadil. Kontsertreisid on viinud teda pea kõikjale Euroopa- kui ka USA, Kanada ja Austraalia publiku ette. Kriitikute sõnul on kontrabass tema kätes palju enamat kui lihtsalt saatepill.",
        "2010. aastal ilmus tema esimene autoriplaat \"Home\" ning aastal 2012 juba teine kauamängiv \"Armada\". Tema viimane plaat \"Peedu Kass Momentum\" ilmus aastal 2016 ning oli ühtlasi nomineeritud Eesti Muusikaauhinnad 2017 \"Aasta jazzalbum\" kategoorias. Ta on pälvinud Elioni Noore Jazzitalendi preemia (2010), võitnud Grand Prix' konkursil Sony Jazz Stage (2006) Riias ning ansambliga Peedu Kass Momentum pälvinud Aasta Jazzansambli tiitli (2017)",
        "Ta on lõpetanud Sibeliuse Akadeemia magistrantuuri (2014) ning Eesti Muusika- ja Teatriakadeemia jazzmuusika osakonna bakalaureuseõppe (2011), lisaks sellele tudeerinud ka Aarhusi Kuninglikus Muusikaakadeemias, Stockholmi Kuninglikus Muusikaakadeemias, Helsingi Metropolia kõrgkoolis ja Georg Otsa nimelises Tallinna muusikakoolis. Peedu Kass on TÜ Viljandi Kultuuriakadeemia õppejõud.",
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
                <ToggleGroup
                  type="single"
                  value={language}
                  onValueChange={(v) => v && setLanguage(v as "en" | "est")}
                  className="rounded-full border border-black/20 overflow-hidden"
                >
                  <ToggleGroupItem
                    value="en"
                    aria-label="English"
                    className="px-4 py-2 font-vietnam text-sm data-[state=on]:bg-black data-[state=on]:text-white"
                  >
                    EN
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="est"
                    aria-label="Estonian"
                    className="px-4 py-2 font-vietnam text-sm data-[state=on]:bg-black data-[state=on]:text-white"
                  >
                    EST
                  </ToggleGroupItem>
                </ToggleGroup>
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

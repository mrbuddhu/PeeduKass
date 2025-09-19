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
          {/* Header with title and language toggle */}
          <div className="flex items-center gap-6 mb-16">
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

          <div className="w-24 h-px bg-black mb-16"></div>

          {/* Alternating layout - only first 3 paragraphs with photos */}
          <div className="space-y-24">
            {language === "en" ? (
              // English layout: para 1 with photo 1, para 2+3 with photo 2, para 4 with photo 3
              <>
                {/* Paragraph 1 with Photo 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up" style={{ animationDelay: "0s" }}>
                  <div className="animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
                    <div className="relative overflow-hidden shadow-3xl max-w-md mx-auto rounded-2xl transform hover:scale-105 hover:shadow-4xl transition-all duration-500 group">
                      <img
                        src="/uploads/1_photo_by_Martin_Heinmets.webp"
                        alt="Photo by Martin Heinmets"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="animate-fade-in-right" style={{ animationDelay: "0.2s" }}>
                    <p className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      {bioContent[language].paragraphs[0]}
                    </p>
                  </div>
                </div>

                {/* Paragraphs 2+3 with Photo 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="lg:col-start-2 animate-fade-in-left" style={{ animationDelay: "0.4s" }}>
                    <div className="relative overflow-hidden shadow-3xl max-w-md mx-auto rounded-2xl transform hover:scale-105 hover:shadow-4xl transition-all duration-500 group">
                      <img
                        src="/uploads/2_photo_by_Harri_Rospu.webp"
                        alt="Photo by Harri Rospu"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="lg:col-start-1 animate-fade-in-right" style={{ animationDelay: "0.5s" }}>
              <div className="space-y-8">
                      <p className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        {bioContent[language].paragraphs[1]}
                      </p>
                      <p className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        {bioContent[language].paragraphs[2]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paragraph 4 with Photo 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <div className="animate-fade-in-left" style={{ animationDelay: "0.7s" }}>
                    <div className="relative overflow-hidden shadow-3xl max-w-md mx-auto rounded-2xl transform hover:scale-105 hover:shadow-4xl transition-all duration-500 group">
                      <img
                        src="/uploads/3_photo_by_Martin_Heinmets.webp"
                        alt="Photo by Martin Heinmets"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="animate-fade-in-right" style={{ animationDelay: "0.8s" }}>
                    <p className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      {bioContent[language].paragraphs[3]}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Estonian layout: original alternating pattern
              bioContent[language].paragraphs.slice(0, 3).map((paragraph, index) => (
                <div 
                    key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {/* Photo */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-fade-in-left`} style={{ animationDelay: `${index * 0.3 + 0.1}s` }}>
                    <div className="relative overflow-hidden shadow-3xl max-w-md mx-auto rounded-2xl transform hover:scale-105 hover:shadow-4xl transition-all duration-500 group">
                      <img
                        src={
                          index === 0 ? "/uploads/1_photo_by_Martin_Heinmets.webp" :
                          index === 1 ? "/uploads/2_photo_by_Harri_Rospu.webp" :
                          "/uploads/3_photo_by_Martin_Heinmets.webp"
                        }
                        alt={
                          index === 0 ? "Photo by Martin Heinmets" :
                          index === 1 ? "Photo by Harri Rospu" :
                          "Photo by Martin Heinmets"
                        }
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} animate-fade-in-right`} style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                    <p className="font-vietnam text-gray-700 leading-relaxed text-xl first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    {paragraph}
                  </p>
              </div>
            </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BioSection

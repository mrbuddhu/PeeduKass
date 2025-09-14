"use client"

import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "./language-context"

const AboutHero = () => {
  const { t } = useLanguage()
  const quotes = useMemo(
    () => [
      {
        text:
          "Estonian bassist Peedu Kass’ Momentum ensemble served as an exciting and intricately woven remake of the piano trio format.",
        author: "Josef Woodard, Downbeat",
      },
      {
        text:
          "Kass demonstrated no shortage of chops...but never in anything less than service of the music. Beyond evolving personal techniques and a clear understanding of the song, Kass evoked a visceral, bluesy feel that laid waste to any claims of American proprietary ownership.",
        author: "John Kelman, AllAboutJazz.com",
      },
      {
        text:
          "Kass pulled a nice, unusual move and provided a welcome escape from too much innovation overload. Kass didn't try to be too pushy, he just did his job, very well.",
        author: "Phillip Woolever, AllAboutJazz.com",
      },
      {
        text:
          "The bassist's opening solo at near the end of the second set was a folk-tinged combination of near-strummed pizzicato and soaring arco that proved Kass was as strong a contender on double-bass as he was, elsewhere in the set, on electric.",
        author: "John Kelman, AllAboutJazz.com",
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length)
        setVisible(true)
      }, 600)
    }, 8000)
    return () => clearInterval(interval)
  }, [quotes.length])
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-[#0b1226] via-[#0a1a3a] to-black text-white overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div
          className="max-w-3xl mx-auto transition-opacity duration-700 h-[80px] md:h-[100px] lg:h-[120px] flex flex-col justify-center items-center"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <blockquote className="font-vietnam italic font-light text-base md:text-lg lg:text-xl text-white/90 leading-relaxed text-balance text-center">
            "{quotes[index].text}"
          </blockquote>
          <div className="text-white/60 font-vietnam text-xs md:text-sm mt-2 md:mt-3">{quotes[index].author}</div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero

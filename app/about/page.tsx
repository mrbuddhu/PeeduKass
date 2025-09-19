import AboutHero from "@/components/about-hero"
import BioSection from "@/components/bio-section"
import BandsSection from "@/components/bands-section"
import AwardsSection from "@/components/awards-section"

export const metadata = {
  title: "About - Peedu Kass | Bassist, Composer & Musician",
  description: "Learn more about Peedu Kass, acclaimed Estonian bassist, composer and educator. Discover his musical journey, bands, awards, and achievements.",
  keywords: "Peedu Kass, about, biography, bassist, composer, Estonian musician, bands, awards, achievements",
  openGraph: {
    title: "About - Peedu Kass | Bassist, Composer & Musician",
    description: "Learn more about Peedu Kass, acclaimed Estonian bassist, composer and educator. Discover his musical journey, bands, awards, and achievements.",
    images: [
      {
        url: "https://peedukass.com/uploads/1_photo_by_Martin_Heinmets.webp",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - About",
      },
    ],
  },
  twitter: {
    title: "About - Peedu Kass | Bassist, Composer & Musician",
    description: "Learn more about Peedu Kass, acclaimed Estonian bassist, composer and educator. Discover his musical journey, bands, awards, and achievements.",
    images: ["https://peedukass.com/uploads/1_photo_by_Martin_Heinmets.webp"],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <BioSection />
      <AwardsSection />
      <BandsSection />
    </div>
  )
}

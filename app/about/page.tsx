import AboutHero from "@/components/about-hero"
import BioSection from "@/components/bio-section"
import BandsSection from "@/components/bands-section"
import AwardsSection from "@/components/awards-section"

export const metadata = {
  title: "About - Peedu Kass",
  description: "Learn more about Peedu Kass, acclaimed bassist, composer and educator from Estonia",
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

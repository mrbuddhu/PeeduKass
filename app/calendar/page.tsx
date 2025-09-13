import GigsSection from "@/components/gigs-section"

export const metadata = {
  title: "Calendar - Peedu Kass",
  description: "Upcoming performances and events by Peedu Kass",
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen">
      <GigsSection />
    </div>
  )
}

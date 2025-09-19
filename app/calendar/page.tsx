import GigsSection from "@/components/gigs-section"

export const metadata = {
  title: "Calendar - Peedu Kass | Upcoming Performances",
  description: "View upcoming performances, concerts, and events by Peedu Kass. Stay updated with his latest shows, tours, and musical appearances.",
  keywords: "Peedu Kass, calendar, performances, concerts, events, upcoming shows, tour dates, musical appearances, Estonian music",
  openGraph: {
    title: "Calendar - Peedu Kass | Upcoming Performances",
    description: "View upcoming performances, concerts, and events by Peedu Kass. Stay updated with his latest shows, tours, and musical appearances.",
    images: [
      {
        url: "https://peedukass.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Calendar",
      },
    ],
  },
  twitter: {
    title: "Calendar - Peedu Kass | Upcoming Performances",
    description: "View upcoming performances, concerts, and events by Peedu Kass. Stay updated with his latest shows, tours, and musical appearances.",
    images: ["https://peedukass.com/logo.png"],
  },
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen">
      <GigsSection />
    </div>
  )
}

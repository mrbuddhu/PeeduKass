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
        url: "https://peedukass.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Calendar",
      },
    ],
  },
  twitter: {
    title: "Calendar - Peedu Kass | Upcoming Performances",
    description: "View upcoming performances, concerts, and events by Peedu Kass. Stay updated with his latest shows, tours, and musical appearances.",
    images: ["https://peedukass.com/og-image.webp"],
  },
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/concerts_bkgr.webp')",
          backgroundAttachment: "fixed"
        }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        <GigsSection />
      </div>
    </div>
  )
}

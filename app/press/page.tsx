import PressKit from "@/components/press-kit"
import PressPhotos from "@/components/press-photos"

export const metadata = {
  title: "Press Kit - Peedu Kass | Media Resources",
  description: "Press materials, high-resolution photos, and information for media professionals. Download press kit, photos, and promotional materials for Peedu Kass.",
  keywords: "Peedu Kass, press kit, media resources, press photos, promotional materials, biography, high-resolution photos, media professionals",
  openGraph: {
    title: "Press Kit - Peedu Kass | Media Resources",
    description: "Press materials, high-resolution photos, and information for media professionals. Download press kit, photos, and promotional materials for Peedu Kass.",
    images: [
      {
        url: "https://peedukass.com/uploads/1_Harri_Rospu.webp",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Press Kit",
      },
    ],
  },
  twitter: {
    title: "Press Kit - Peedu Kass | Media Resources",
    description: "Press materials, high-resolution photos, and information for media professionals. Download press kit, photos, and promotional materials for Peedu Kass.",
    images: ["https://peedukass.com/uploads/1_Harri_Rospu.webp"],
  },
}

export default function PressPage() {
  return (
    <div className="min-h-screen">
      <PressKit />
      <PressPhotos />
    </div>
  )
}

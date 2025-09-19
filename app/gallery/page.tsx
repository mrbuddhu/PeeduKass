import VideoGallery from "@/components/video-gallery"
import PhotoGallery from "@/components/photo-gallery"

export const metadata = {
  title: "Gallery - Peedu Kass | Photos & Videos",
  description: "Explore photos and videos from Peedu Kass performances, studio sessions, and musical collaborations. Visual journey through his musical career.",
  keywords: "Peedu Kass, gallery, photos, videos, performances, studio sessions, concerts, musical collaborations, Estonian music",
  openGraph: {
    title: "Gallery - Peedu Kass | Photos & Videos",
    description: "Explore photos and videos from Peedu Kass performances, studio sessions, and musical collaborations. Visual journey through his musical career.",
    images: [
      {
        url: "https://peedukass.com/uploads/1758265829938-1.webp",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Gallery",
      },
    ],
  },
  twitter: {
    title: "Gallery - Peedu Kass | Photos & Videos",
    description: "Explore photos and videos from Peedu Kass performances, studio sessions, and musical collaborations. Visual journey through his musical career.",
    images: ["https://peedukass.com/uploads/1758265829938-1.webp"],
  },
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <VideoGallery />
      <PhotoGallery />
    </div>
  )
}

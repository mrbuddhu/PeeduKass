import GalleryHero from "@/components/gallery-hero"
import PhotoGallery from "@/components/photo-gallery"
import VideoGallery from "@/components/video-gallery"

export const metadata = {
  title: "Gallery - Peedu Kass",
  description: "Photos and videos from performances and studio sessions",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <GalleryHero />
      <PhotoGallery />
      <VideoGallery />
    </div>
  )
}

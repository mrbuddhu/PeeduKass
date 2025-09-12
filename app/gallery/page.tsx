import VideoGallery from "@/components/video-gallery"
import PhotoGallery from "@/components/photo-gallery"

export const metadata = {
  title: "Gallery - Peedu Kass",
  description: "Photos and videos from performances and studio sessions",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <VideoGallery />
      <PhotoGallery />
    </div>
  )
}

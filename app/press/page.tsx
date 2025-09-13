import PressKit from "@/components/press-kit"
import PressPhotos from "@/components/press-photos"

export const metadata = {
  title: "Press Kit - Peedu Kass",
  description: "Press materials, photos, and information for media professionals",
}

export default function PressPage() {
  return (
    <div className="min-h-screen">
      <PressKit />
      <PressPhotos />
    </div>
  )
}

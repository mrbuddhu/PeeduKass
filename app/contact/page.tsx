import ContactHero from "@/components/contact-hero"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"

export const metadata = {
  title: "Contact - Peedu Kass",
  description: "Get in touch with Peedu Kass for bookings, collaborations, and inquiries",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}

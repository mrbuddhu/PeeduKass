import ContactMinimal from "@/components/contact-minimal"

export const metadata = {
  title: "Contact - Peedu Kass | Bookings & Inquiries",
  description: "Get in touch with Peedu Kass for bookings, collaborations, and inquiries. Contact information for musical projects, performances, and partnerships.",
  keywords: "Peedu Kass, contact, bookings, collaborations, inquiries, musical projects, performances, partnerships, Estonian musician",
  openGraph: {
    title: "Contact - Peedu Kass | Bookings & Inquiries",
    description: "Get in touch with Peedu Kass for bookings, collaborations, and inquiries. Contact information for musical projects, performances, and partnerships.",
    images: [
      {
        url: "https://peedukass.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Peedu Kass - Contact",
      },
    ],
  },
  twitter: {
    title: "Contact - Peedu Kass | Bookings & Inquiries",
    description: "Get in touch with Peedu Kass for bookings, collaborations, and inquiries. Contact information for musical projects, performances, and partnerships.",
    images: ["https://peedukass.com/logo.png"],
  },
}

export default function ContactPage() {
  return <ContactMinimal />
}

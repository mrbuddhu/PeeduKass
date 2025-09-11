"use client"

import { Mail, Phone, Instagram, Youtube, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import { useLanguage } from "./language-context"

const ContactInfo = () => {
  const { t } = useLanguage()
  const user = "info"
  const domain = "peedukass"
  const tld = "com"
  const obfuscated = `${user} [at] ${domain} [dot] ${tld}`
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: obfuscated,
      href: null,
      description: undefined,
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+372 520 4970",
      href: "tel:+3725204970",
      description: undefined,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: t("footer.location"),
      href: null,
      description: undefined,
    },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://youtube.com",
      color: "hover:text-red-600",
    },
  ]

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h2 className="font-playfair text-3xl font-bold text-black mb-8">{t("contact.info.title")}</h2>

        <div className="space-y-6 mb-8">
          {contactMethods.map((method, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-vietnam font-semibold text-black mb-1">{method.label}</h3>
                    {method.label === "Email" ? (
                      <button
                        onClick={() => (window.location.href = `mailto:${user}@${domain}.${tld}`)}
                        className="font-vietnam text-lg text-black hover:underline block mb-2 text-left"
                        aria-label="Send email"
                      >
                        {method.value}
                      </button>
                    ) : method.href ? (
                      <a href={method.href} className="font-vietnam text-lg text-black hover:underline block mb-2">
                        {method.value}
                      </a>
                    ) : (
                      <p className="font-vietnam text-lg text-black mb-2">{method.value}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-vietnam font-semibold text-black mb-4">{t("contact.info.follow")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-gray-600 ${social.color} transition-colors font-vietnam`}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-vietnam font-semibold text-black mb-2">{t("contact.response.title")}</h3>
          <p className="font-vietnam text-gray-600 text-sm">
            {t("contact.response.text")}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo

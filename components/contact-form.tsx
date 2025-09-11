"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Send } from "lucide-react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h2 className="font-playfair text-3xl font-bold text-black mb-8">{t("contact.form.title")}</h2>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="font-vietnam font-medium text-black mb-2 block">
                    {t("contact.form.name")} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="font-vietnam"
                    placeholder={t("contact.form.name")}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-vietnam font-medium text-black mb-2 block">
                    {t("contact.form.email")} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="font-vietnam"
                    placeholder={t("contact.form.email")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="font-vietnam font-medium text-black mb-2 block">
                  {t("contact.form.subject")} *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="font-vietnam"
                  placeholder={t("contact.form.subject")}
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-vietnam font-medium text-black mb-2 block">
                  {t("contact.form.message")} *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="font-vietnam min-h-[120px]"
                  placeholder={t("contact.form.message")}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("contact.form.send")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t("contact.form.send")}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactForm

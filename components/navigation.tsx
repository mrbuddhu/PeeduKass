"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { href: "/", label: "nav.home" },
    { href: "/about", label: "nav.about" },
    { href: "/calendar", label: "nav.calendar" },
    { href: "/gallery", label: "nav.gallery" },
    { href: "/audio", label: "nav.audio" },
    { href: "/press", label: "nav.press" },
    { href: "/contact", label: "nav.contact" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "est" : "en")
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Go to homepage"
          >
            <img
              src="/logo.png"
              alt="Peedu Kass logo"
              className="h-8 w-auto md:h-10 object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-vietnam text-sm font-medium text-black hover:text-gray-600 transition-colors uppercase tracking-wider relative group"
              >
                {t(item.label)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-black border-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide font-vietnam bg-transparent"
            >
              <Globe className="h-4 w-4" />
              {language}
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-black hover:text-gray-600 font-vietnam uppercase tracking-wide"
            >
              <Globe className="h-4 w-4" />
              {language}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-md border-t border-black/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 font-vietnam text-base font-medium text-black hover:text-gray-600 transition-colors uppercase tracking-wider border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

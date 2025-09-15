import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-context"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Peedu Kass - Bassist, Composer & Educator",
  description: "Acclaimed bassist, composer and educator from Estonia",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${beVietnam.variable}`}>
      <body className="font-vietnam bg-white text-black antialiased">
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="pt-16 md:pt-20">{children}</main>
            <Footer />
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}

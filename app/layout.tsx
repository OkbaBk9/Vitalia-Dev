import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const arabicFont = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://okbaservices.com"),
  title: "أوقبة سرفيسز - Okba Services | خدمات احترافية متكاملة",
  description: "خدمات احترافية: طباعة، تصوير، خدمات رقمية، إدارية، مالية ودفعية. نقدم أفضل الحلول في الجزائر.",
  keywords: ["أوقبة", "خدمات", "طباعة", "تصوير", "رقمية", "بليدة", "الجزائر"],
  authors: [{ name: "Okba Services" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ar_DZ",
    url: "https://okbaservices.com",
    title: "أوقبة سرفيسز - Okba Services",
    description: "خدمات احترافية متكاملة",
    images: [
      {
        url: "https://okbaservices.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Okba Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Okba Services",
    description: "خدمات احترافية متكاملة",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.className} ${montserrat.className}`}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://okbaservices.com" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

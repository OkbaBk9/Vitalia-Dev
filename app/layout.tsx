import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { FloatingGuardian } from "@/components/floating-guardian"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vitalia - AI Health Guardian",
  description: "Your personalized wellness companion",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`font-sans antialiased`}>
        <Navigation />
        <main className="pt-16 pb-20 md:pb-0">{children}</main>
        <FloatingGuardian />
        <Analytics />
      </body>
    </html>
  )
}

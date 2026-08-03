"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/pricing", label: "الأسعار" },
  { href: "/about", label: "حولنا" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "اتصل بنا" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg"
          : "bg-white/50 dark:bg-slate-900/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-black text-lg">O</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-blue-600 leading-none">أوقبة</div>
              <div className="text-xs text-muted-foreground">سرفيسز</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/213780229481"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              اتصل الآن
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-down absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-border shadow-lg">
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <a
                  href="https://wa.me/213780229481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsOpen(false)}
                >
                  اتصل عبر واتساب
                </a>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-2 text-sm">
                <a
                  href="tel:+213780229481"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} />
                  0780229481
                </a>
                <a
                  href="mailto:okbaservices09@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  <Mail size={16} />
                  okbaservices09@gmail.com
                </a>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>باب الجزائر، البليدة</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Chrome as Home, Users, BookOpen, ShoppingBag, CalendarDays, Zap, Stethoscope, Settings, Search, Menu, X, ChevronRight, LogOut, User, Moon, Sun, CircleHelp as HelpCircle, MapPin } from "lucide-react"
import { NotificationsDropdown } from "./notifications-dropdown"
import { SettingsModal } from "./settings-modal"

const navItems = [
  { href: "/", label: "Home", id: "home", icon: Home },
  { href: "/blog", label: "Explore", id: "blog", icon: BookOpen },
  { href: "/map", label: "Map", id: "map", icon: MapPin },
  { href: "/consultants", label: "Consult", id: "consultants", icon: Stethoscope },
  { href: "/events", label: "Events", id: "events", icon: CalendarDays },
]

export function Navigation() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hasNotification, setHasNotification] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const lastScrollY = useRef(0)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)

  const activeId =
    pathname === "/"
      ? "home"
      : navItems.find((item) => pathname.startsWith(item.href) && item.href !== "/")?.id || "home"

  // Smart header - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsAtTop(currentScrollY < 10)
      
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setIsVisible(false)
        setNotificationsOpen(false)
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false)
      }
    }
    if (notificationsOpen || settingsOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [notificationsOpen, settingsOpen])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      {/* Desktop nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isAtTop
            ? "bg-transparent"
            : "glass-nav border-b border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo - Empty placeholder */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 btn-bounce">
              {/* Empty logo placeholder */}
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block tracking-tight transition-colors duration-300">Vitalia</span>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, id, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group btn-bounce ${
                  activeId === id
                    ? "text-primary bg-primary/12 backdrop-blur-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 hover:backdrop-blur-sm"
                }`}
              >
                <Icon size={16} className="transition-transform group-hover:scale-110" />
                {label}
                {activeId === id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex p-2.5 rounded-xl glass-button text-muted-foreground hover:text-foreground transition-colors duration-300 hover:shadow-md"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen)
                }}
                className={`relative p-2.5 rounded-xl transition-all duration-300 btn-bounce ${
                  notificationsOpen
                    ? "bg-primary/15 text-primary shadow-md shadow-primary/20"
                    : "glass-button text-muted-foreground hover:text-foreground hover:shadow-md"
                }`}
              >
                <Bell size={20} />
                {hasNotification && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full shadow-sm shadow-destructive/50">
                    <span className="absolute inset-0 rounded-full bg-destructive animate-pulse-ring" />
                  </span>
                )}
              </button>
              <NotificationsDropdown
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                onClearBadge={() => setHasNotification(false)}
              />
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex p-2.5 rounded-xl glass-button text-muted-foreground hover:text-foreground btn-bounce transition-colors duration-300 hover:shadow-md"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Settings */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="hidden sm:flex p-2.5 rounded-xl glass-button text-muted-foreground hover:text-foreground btn-bounce transition-colors duration-300 hover:shadow-md"
            >
              <Settings size={20} className="transition-transform hover:rotate-90 duration-500" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl glass-button text-muted-foreground btn-bounce"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 glass-card z-50 animate-slide-left shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <span className="font-bold text-foreground">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            {/* Profile section in mobile menu */}
            <Link 
              href="/profile" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-4 border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold">
                EB
              </div>
              <div>
                <p className="font-bold text-foreground">Elmehdi B.</p>
                <p className="text-xs text-muted-foreground">Level 12 - 2,650 VP</p>
              </div>
            </Link>

            <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
              {navItems.map(({ href, label, id, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeId === id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}

              <div className="border-t border-border/50 my-3" />

              <button 
                onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors text-foreground"
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </button>

              <button 
                onClick={() => { toggleDarkMode(); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors text-foreground"
              >
                <div className="flex items-center gap-3">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="font-medium">Dark Mode</span>
                </div>
                <div className={`w-10 h-6 rounded-full p-0.5 transition-all ${isDark ? "bg-primary" : "bg-muted"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${isDark ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mobile bottom nav - Clean 5-item dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map(({ href, label, id, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
                activeId === id 
                  ? "text-primary bg-primary/10 scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <Icon size={20} strokeWidth={activeId === id ? 2.5 : 2} />
              <span className="text-[8px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Search modal */}
      {searchOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50 animate-slide-down">
            <div className="glass-card rounded-2xl overflow-hidden p-4 flex items-center gap-3">
              <Search size={20} className="text-muted-foreground" />
              <input
                autoFocus
                type="text"
                placeholder="Search events, clubs, people..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}

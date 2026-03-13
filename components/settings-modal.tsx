"use client"

import { useState } from "react"
import {
  X,
  Moon,
  Sun,
  Bell,
  BellOff,
  Globe,
  Lock,
  Smartphone,
  Palette,
  Volume2,
  VolumeX,
  Eye,
  ChevronRight,
  Shield,
  Heart,
  Zap,
  Languages,
  Trash2,
  Download,
  Info,
  Mail,
  MessageSquare,
} from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingToggle {
  id: string
  label: string
  description: string
  enabled: boolean
  iconOn: React.ElementType
  iconOff: React.ElementType
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<"general" | "notifications" | "privacy" | "about">("general")
  const [settings, setSettings] = useState<SettingToggle[]>([
    {
      id: "darkMode",
      label: "Dark Mode",
      description: "Switch to dark theme",
      enabled: false,
      iconOn: Moon,
      iconOff: Sun,
    },
    {
      id: "notifications",
      label: "Push Notifications",
      description: "Receive health reminders",
      enabled: true,
      iconOn: Bell,
      iconOff: BellOff,
    },
    {
      id: "sounds",
      label: "Sounds",
      description: "Play sounds for achievements",
      enabled: true,
      iconOn: Volume2,
      iconOff: VolumeX,
    },
    {
      id: "privacy",
      label: "Private Profile",
      description: "Hide from leaderboards",
      enabled: false,
      iconOn: Lock,
      iconOff: Eye,
    },
    {
      id: "haptics",
      label: "Haptic Feedback",
      description: "Vibrate on interactions",
      enabled: true,
      iconOn: Zap,
      iconOff: Zap,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          // Apply dark mode toggle
          if (id === "darkMode") {
            document.documentElement.classList.toggle("dark")
          }
          return { ...s, enabled: !s.enabled }
        }
        return s
      })
    )
  }

  if (!isOpen) return null

  const sections = [
    { id: "general" as const, label: "General", icon: Palette },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "privacy" as const, label: "Privacy", icon: Shield },
    { id: "about" as const, label: "About", icon: Info },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[85vh] z-50 animate-scale-in">
        <div className="h-full glass-card rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-bold text-foreground">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-secondary/50 transition-colors btn-bounce"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Section tabs */}
          <div className="flex border-b border-border/50 px-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeSection === section.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <section.icon size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {activeSection === "general" && (
              <>
                {settings.slice(0, 3).map((setting, index) => {
                  const IconOn = setting.iconOn
                  const IconOff = setting.iconOff
                  return (
                    <button
                      key={setting.id}
                      onClick={() => toggleSetting(setting.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all group btn-bounce"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          setting.enabled
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {setting.enabled ? <IconOn size={18} /> : <IconOff size={18} />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-sm text-foreground">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <div
                        className={`w-12 h-7 rounded-full p-1 transition-all ${
                          setting.enabled ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                            setting.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  )
                })}

                <div className="border-t border-border/50 my-4" />

                {[
                  { label: "Language", value: "English", icon: Languages },
                  { label: "Connected Devices", value: "4 devices", icon: Smartphone },
                  { label: "Theme Color", value: "Green", icon: Palette },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all group btn-bounce"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <item.icon size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </>
            )}

            {activeSection === "notifications" && (
              <>
                {[
                  { label: "Daily Reminders", description: "Get reminded to log your activities", enabled: true },
                  { label: "Achievement Alerts", description: "Know when you earn badges", enabled: true },
                  { label: "Social Notifications", description: "High-fives and comments", enabled: true },
                  { label: "Event Updates", description: "Upcoming events and changes", enabled: false },
                  { label: "Weekly Summary", description: "Your progress report every Sunday", enabled: true },
                  { label: "Tips & Insights", description: "Personalized health tips from AI", enabled: false },
                ].map((item, index) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all btn-bounce"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <div className={`w-12 h-7 rounded-full p-1 transition-all ${item.enabled ? "bg-primary" : "bg-muted"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${item.enabled ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                  </button>
                ))}
              </>
            )}

            {activeSection === "privacy" && (
              <>
                {settings.slice(3).map((setting, index) => {
                  const IconOn = setting.iconOn
                  const IconOff = setting.iconOff
                  return (
                    <button
                      key={setting.id}
                      onClick={() => toggleSetting(setting.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all btn-bounce"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${setting.enabled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {setting.enabled ? <IconOn size={18} /> : <IconOff size={18} />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-sm text-foreground">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className={`w-12 h-7 rounded-full p-1 transition-all ${setting.enabled ? "bg-primary" : "bg-muted"}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${setting.enabled ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                    </button>
                  )
                })}

                <div className="border-t border-border/50 my-4" />

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all btn-bounce">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Download size={18} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-foreground">Download My Data</p>
                    <p className="text-xs text-muted-foreground">Export all your health data</p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-destructive/30 hover:border-destructive/50 bg-destructive/5 hover:bg-destructive/10 transition-all btn-bounce">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Trash2 size={18} className="text-destructive" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-destructive">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account</p>
                  </div>
                </button>
              </>
            )}

            {activeSection === "about" && (
              <>
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25">
                    <Heart size={32} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Vitalia</h3>
                  <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                </div>

                {[
                  { label: "Rate Us", description: "Love Vitalia? Leave a review!", icon: Heart },
                  { label: "Contact Support", description: "Get help from our team", icon: Mail },
                  { label: "Send Feedback", description: "Help us improve", icon: MessageSquare },
                  { label: "Privacy Policy", description: "How we handle your data", icon: Shield },
                  { label: "Terms of Service", description: "Usage agreement", icon: Info },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all btn-bounce"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <item.icon size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>
                ))}

                <p className="text-center text-xs text-muted-foreground pt-4">
                  Made with love in Algeria
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

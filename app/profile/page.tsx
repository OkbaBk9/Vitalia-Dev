"use client"

import { useState } from "react"
import {
  Award,
  Flame,
  Zap,
  TrendingUp,
  Calendar,
  MapPin,
  Settings,
  Shield,
  Target,
  Droplet,
  Brain,
  Footprints,
  Star,
  Watch,
  Smartphone,
  Link2,
  CheckCircle2,
  Wifi,
  Activity,
} from "lucide-react"
import { SettingsModal } from "@/components/settings-modal"

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ElementType
  earned: boolean
  date?: string
  color: string
}

interface ConnectedDevice {
  id: string
  name: string
  type: "watch" | "app"
  icon: React.ElementType
  connected: boolean
  lastSync?: string
  color: string
}

const badges: Badge[] = [
  { id: "1", name: "First Steps", description: "Complete your first daily path", icon: Footprints, earned: true, date: "Feb 14", color: "var(--primary)" },
  { id: "2", name: "7 Day Streak", description: "Maintain a 7-day streak", icon: Flame, earned: true, date: "Feb 21", color: "var(--color-orange)" },
  { id: "3", name: "Hydration Hero", description: "Hit water goal 10 days", icon: Droplet, earned: true, date: "Feb 25", color: "var(--color-hydration)" },
  { id: "4", name: "Mind Master", description: "Complete 20 mental checks", icon: Brain, earned: true, date: "Mar 1", color: "var(--color-blue)" },
  { id: "5", name: "Community Star", description: "Get 50 high-fives", icon: Star, earned: false, color: "var(--color-orange)" },
  { id: "6", name: "Runner's Badge", description: "Join a group run event", icon: MapPin, earned: false, color: "var(--primary)" },
  { id: "7", name: "Zen Master", description: "Complete a mindfulness workshop", icon: Shield, earned: false, color: "var(--color-blue)" },
  { id: "8", name: "30 Day Legend", description: "Maintain a 30-day streak", icon: Target, earned: false, color: "var(--color-orange)" },
]

const connectedDevices: ConnectedDevice[] = [
  { id: "apple", name: "Apple Watch", type: "watch", icon: Watch, connected: true, lastSync: "2 min ago", color: "var(--foreground)" },
  { id: "samsung", name: "Samsung Galaxy Watch", type: "watch", icon: Watch, connected: false, color: "var(--muted-foreground)" },
  { id: "fitbit", name: "Fitbit", type: "watch", icon: Activity, connected: false, color: "var(--color-blue)" },
  { id: "garmin", name: "Garmin", type: "watch", icon: Watch, connected: true, lastSync: "15 min ago", color: "var(--color-orange)" },
  { id: "strava", name: "Strava", type: "app", icon: Activity, connected: true, lastSync: "1h ago", color: "var(--color-orange)" },
  { id: "health", name: "Apple Health", type: "app", icon: Smartphone, connected: true, lastSync: "5 min ago", color: "var(--primary)" },
  { id: "google-fit", name: "Google Fit", type: "app", icon: Smartphone, connected: false, color: "var(--color-blue)" },
  { id: "myfitnesspal", name: "MyFitnessPal", type: "app", icon: Smartphone, connected: false, color: "var(--primary)" },
]

const weeklyStats = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: true },
  { day: "Sun", completed: false },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"stats" | "badges" | "connections">("stats")
  const [devices, setDevices] = useState(connectedDevices)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const level = 12
  const xpCurrent = 650
  const xpNextLevel = 1000
  const xpProgress = (xpCurrent / xpNextLevel) * 100

  const toggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, connected: !d.connected, lastSync: !d.connected ? "Just now" : undefined }
          : d,
      ),
    )
  }

  const tabs = [
    { id: "stats" as const, label: "Statistics" },
    { id: "badges" as const, label: `Badges (${badges.filter((b) => b.earned).length}/${badges.length})` },
    { id: "connections" as const, label: `Devices (${devices.filter((d) => d.connected).length})` },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--color-blue)]/8 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Profile Header */}
      <div className="glass-card border-b border-border/50 relative">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-bold border-4 border-primary/30">
                EB
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[var(--color-blue)] text-card px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border-2 border-card">
                Lv.{level}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-foreground">Elmehdi B.</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Vitalian since Feb 2026</p>
                </div>
                <button 
                  onClick={() => setSettingsOpen(true)}
                  className="p-2 rounded-xl bg-secondary border-2 border-border hover:bg-secondary/80 transition-all group"
                >
                  <Settings size={18} className="text-muted-foreground group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* XP Bar */}
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1.5">
                  <span className="font-bold text-foreground">Level {level}</span>
                  <span className="text-muted-foreground">
                    {xpCurrent} / {xpNextLevel} VP to Level {level + 1}
                  </span>
                </div>
                <div className="w-full h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${xpProgress}%`, backgroundColor: "var(--color-blue)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-5 sm:mt-6">
            {[
              { label: "Streak", value: "7", icon: Flame, color: "var(--color-orange)" },
              { label: "VitaPoints", value: "2,650", icon: Zap, color: "var(--primary)" },
              { label: "Badges", value: `${badges.filter((b) => b.earned).length}`, icon: Award, color: "var(--color-blue)" },
              { label: "Events", value: "3", icon: Calendar, color: "var(--color-orange)" },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary/50 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center border-2 border-border">
                <stat.icon size={16} className="mx-auto mb-1" style={{ color: stat.color }} />
                <p className="text-sm sm:text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 glass-nav">
        <div className="max-w-2xl mx-auto px-4 flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all whitespace-nowrap px-2 ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 relative">
        {activeTab === "stats" && (
          <div className="space-y-4 sm:space-y-6 stagger-children">
            {/* Weekly activity heatmap */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5">
              <h3 className="font-bold text-foreground mb-3 sm:mb-4">This Week</h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {weeklyStats.map((day) => (
                  <div key={day.day} className="flex-1 text-center">
                    <div
                      className={`w-full aspect-square rounded-lg sm:rounded-xl flex items-center justify-center mb-1 border-2 transition-all ${
                        day.completed
                          ? "bg-primary/10 border-primary/30"
                          : "bg-secondary border-border"
                      }`}
                    >
                      {day.completed && <Flame size={14} className="text-primary" />}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 btn-bounce cursor-pointer">
                <TrendingUp size={18} className="text-primary mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-foreground">87%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Avg Vitality Score</p>
              </div>
              <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 btn-bounce cursor-pointer">
                <Footprints size={18} style={{ color: "var(--color-activity)" }} className="mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-foreground">52.4K</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Steps This Week</p>
              </div>
              <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 btn-bounce cursor-pointer">
                <Droplet size={18} style={{ color: "var(--color-hydration)" }} className="mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-foreground">12.6L</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Water This Week</p>
              </div>
              <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 btn-bounce cursor-pointer">
                <Brain size={18} style={{ color: "var(--color-blue)" }} className="mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-foreground">23</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Mindful Minutes</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 stagger-children">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center transition-all btn-bounce cursor-pointer ${
                    badge.earned
                      ? "hover:shadow-lg"
                      : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 ${
                      badge.earned ? "" : "bg-secondary"
                    }`}
                    style={
                      badge.earned
                        ? { backgroundColor: `color-mix(in srgb, ${badge.color} 15%, transparent)` }
                        : {}
                    }
                  >
                    <Icon
                      size={22}
                      style={badge.earned ? { color: badge.color } : {}}
                      className={badge.earned ? "" : "text-muted-foreground"}
                    />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-foreground mb-0.5">{badge.name}</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{badge.description}</p>
                  {badge.earned && badge.date && (
                    <span className="text-[10px] font-bold text-primary">Earned {badge.date}</span>
                  )}
                  {!badge.earned && (
                    <span className="text-[10px] font-bold text-muted-foreground">Locked</span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {activeTab === "connections" && (
          <div className="space-y-6 stagger-children">
            {/* Watches section */}
            <div>
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Watch size={18} className="text-muted-foreground" />
                Smartwatches
              </h3>
              <div className="space-y-2">
                {devices
                  .filter((d) => d.type === "watch")
                  .map((device) => {
                    const Icon = device.icon
                    return (
                      <div
                        key={device.id}
                        className={`glass-card rounded-2xl p-4 flex items-center gap-4 transition-all ${
                          device.connected ? "shadow-sm" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            device.connected ? "bg-primary/10" : "bg-secondary"
                          }`}
                        >
                          <Icon
                            size={22}
                            style={{ color: device.connected ? "var(--primary)" : undefined }}
                            className={device.connected ? "" : "text-muted-foreground"}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-foreground">{device.name}</p>
                            {device.connected && (
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                            )}
                          </div>
                          {device.connected && device.lastSync && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Wifi size={10} className="text-primary" />
                              <span className="text-[10px] text-muted-foreground">
                                Synced {device.lastSync}
                              </span>
                            </div>
                          )}
                          {!device.connected && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">Not connected</p>
                          )}
                        </div>
                        <button
                          onClick={() => toggleDevice(device.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-95 ${
                            device.connected
                              ? "bg-secondary border-border text-foreground hover:bg-secondary/80"
                              : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                          }`}
                        >
                          {device.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Apps section */}
            <div>
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Link2 size={18} className="text-muted-foreground" />
                Health Apps
              </h3>
              <div className="space-y-2">
                {devices
                  .filter((d) => d.type === "app")
                  .map((device) => {
                    const Icon = device.icon
                    return (
                      <div
                        key={device.id}
                        className={`glass-card rounded-2xl p-4 flex items-center gap-4 transition-all ${
                          device.connected ? "shadow-sm" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            device.connected ? "bg-primary/10" : "bg-secondary"
                          }`}
                        >
                          <Icon
                            size={22}
                            style={{ color: device.connected ? "var(--primary)" : undefined }}
                            className={device.connected ? "" : "text-muted-foreground"}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-foreground">{device.name}</p>
                            {device.connected && (
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                            )}
                          </div>
                          {device.connected && device.lastSync && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Wifi size={10} className="text-primary" />
                              <span className="text-[10px] text-muted-foreground">
                                Synced {device.lastSync}
                              </span>
                            </div>
                          )}
                          {!device.connected && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">Not connected</p>
                          )}
                        </div>
                        <button
                          onClick={() => toggleDevice(device.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-95 ${
                            device.connected
                              ? "bg-secondary border-border text-foreground hover:bg-secondary/80"
                              : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                          }`}
                        >
                          {device.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Sync info */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-4">
              <p className="text-sm text-foreground font-semibold mb-1">Auto-sync Enabled</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connected devices sync health data every 15 minutes. Steps, heart rate, sleep, and activity data are used to calculate your Vitality Score.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

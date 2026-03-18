"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Heart, Settings, X, Bell, Bookmark } from "lucide-react"

interface ProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const [activeTab, setActiveTab] = useState<"events" | "maps" | "saved" | "settings">("events")

  const sidebarItems = [
    { id: "events", label: "Events", icon: Calendar, count: 3 },
    { id: "maps", label: "Saved Maps", icon: MapPin, count: 5 },
    { id: "saved", label: "Saved Posts", icon: Bookmark, count: 12 },
    { id: "settings", label: "Settings", icon: Settings, count: 0 },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-sm z-50 glass-card border-l border-border/50 flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h2 className="text-lg font-bold text-foreground">My Profile</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 transition-all md:hidden">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Profile Summary */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm">
              EB
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">Elmehdi B.</p>
              <p className="text-xs text-muted-foreground">Level 12 • Vitalian</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-3 border-b border-border/50 overflow-x-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {item.label}
                {item.count > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === item.id ? "bg-primary/30" : "bg-secondary"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {activeTab === "events" && (
            <div className="space-y-2">
              {[
                { name: "Morning Run", time: "Tomorrow 7:00 AM", location: "Algiers Bay" },
                { name: "Yoga Session", time: "Fri 5:00 PM", location: "Community Center" },
                { name: "10km Challenge", time: "Sat 6:30 AM", location: "Downtown" },
              ].map((event) => (
                <div key={event.name} className="glass-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all cursor-pointer">
                  <p className="font-semibold text-sm text-foreground">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin size={12} />
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "maps" && (
            <div className="space-y-2">
              {[
                { name: "Favorite Runs", routes: 3 },
                { name: "Club Locations", routes: 5 },
                { name: "Hiking Trails", routes: 2 },
              ].map((map) => (
                <div key={map.name} className="glass-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all cursor-pointer">
                  <p className="font-semibold text-sm text-foreground">{map.name}</p>
                  <p className="text-xs text-muted-foreground">{map.routes} routes saved</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-2">
              {[
                { author: "Karim H.", content: "New personal best on 5km!", time: "3h ago" },
                { author: "Sara M.", content: "Looking for running partners...", time: "5h ago" },
                { author: "Anonymous", content: "Today I practiced saying no...", time: "2h ago" },
              ].map((post, i) => (
                <div key={i} className="glass-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all cursor-pointer">
                  <p className="font-semibold text-sm text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{post.time}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-2">
              {[
                { name: "Privacy Settings", desc: "Control who sees your profile" },
                { name: "Notifications", desc: "Manage alert preferences" },
                { name: "Connected Devices", desc: "View paired devices" },
                { name: "Account Settings", desc: "Password and security" },
              ].map((setting) => (
                <button
                  key={setting.name}
                  className="w-full glass-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all text-left"
                >
                  <p className="font-semibold text-sm text-foreground">{setting.name}</p>
                  <p className="text-xs text-muted-foreground">{setting.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 p-3">
          <button className="w-full py-2.5 bg-destructive/10 text-destructive rounded-lg font-semibold text-sm hover:bg-destructive/20 transition-all">
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

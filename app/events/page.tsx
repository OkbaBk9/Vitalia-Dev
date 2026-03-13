"use client"

import { useState } from "react"
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  QrCode,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  type: "workshop" | "meetup" | "popup" | "run"
  checkedIn: boolean
  registered: boolean
  badge?: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Saturday Community Run",
    description: "Join the Vitalia running community for a morning 5km run along the waterfront. All levels welcome!",
    date: "Mar 8, 2026",
    time: "7:00 AM",
    location: "Sablette Beach, Algiers",
    attendees: 67,
    maxAttendees: 100,
    type: "run",
    checkedIn: false,
    registered: true,
    badge: "Runner's Badge",
  },
  {
    id: "2",
    title: "Mindfulness Workshop",
    description: "Learn practical mindfulness techniques with Dr. Amina Benali. Includes guided meditation and journaling.",
    date: "Mar 10, 2026",
    time: "3:00 PM",
    location: "Vitalia Hub, Constantine",
    attendees: 32,
    maxAttendees: 40,
    type: "workshop",
    checkedIn: false,
    registered: false,
    badge: "Zen Master Badge",
  },
  {
    id: "3",
    title: "Vitalia Pop-up Shop",
    description: "Exclusive deals on the Vitalia Bracelet and eco-friendly wellness gear. Scan QR codes for digital badges!",
    date: "Mar 12, 2026",
    time: "10:00 AM",
    location: "Bab Ezzouar Mall, Algiers",
    attendees: 156,
    maxAttendees: 300,
    type: "popup",
    checkedIn: false,
    registered: false,
    badge: "Eco Shopper Badge",
  },
  {
    id: "4",
    title: "Nutrition & Cooking Meetup",
    description: "A hands-on cooking session focused on healthy Algerian recipes. Bring your appetite!",
    date: "Mar 15, 2026",
    time: "5:00 PM",
    location: "Community Center, Oran",
    attendees: 45,
    maxAttendees: 50,
    type: "meetup",
    checkedIn: false,
    registered: true,
  },
  {
    id: "5",
    title: "10km Challenge Run",
    description: "Push your limits with the Vitalia 10km challenge. Top finishers earn bonus VitaPoints!",
    date: "Mar 20, 2026",
    time: "6:30 AM",
    location: "Jardin d'Essai, Algiers",
    attendees: 89,
    maxAttendees: 200,
    type: "run",
    checkedIn: false,
    registered: false,
    badge: "Speed Demon Badge",
  },
]

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  workshop: { bg: "bg-[var(--color-blue)]/10", text: "text-foreground", label: "Workshop" },
  meetup: { bg: "bg-primary/10", text: "text-primary", label: "Meetup" },
  popup: { bg: "bg-[var(--color-orange)]/10", text: "text-foreground", label: "Pop-up" },
  run: { bg: "bg-primary/10", text: "text-primary", label: "Group Run" },
}

export default function EventsPage() {
  const [eventsList, setEventsList] = useState(events)
  const [showScanner, setShowScanner] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = ["all", "run", "workshop", "meetup", "popup"]
  const filtered = selectedFilter === "all" ? eventsList : eventsList.filter((e) => e.type === selectedFilter)

  const toggleRegister = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              registered: !e.registered,
              attendees: e.registered ? e.attendees - 1 : e.attendees + 1,
            }
          : e,
      ),
    )
  }

  const checkIn = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, checkedIn: true } : e)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b-2 border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">Events</h1>
              <p className="text-sm text-muted-foreground">Real-world wellness meetups</p>
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-orange)]/10 border-2 border-[var(--color-orange)]/20 rounded-2xl text-sm font-bold transition-all hover:bg-[var(--color-orange)]/20 active:scale-[0.98]"
              style={{ color: "var(--color-orange)" }}
            >
              <QrCode size={18} />
              Scan QR
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${
                  selectedFilter === f
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/20"
                }`}
              >
                {f === "all" ? "All" : typeColors[f]?.label || f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filtered.map((event) => {
            const typeStyle = typeColors[event.type]
            return (
              <div
                key={event.id}
                className="bg-card border-2 border-border rounded-3xl overflow-hidden hover:border-primary/20 transition-all"
              >
                <div className="p-5">
                  {/* Type badge and date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeStyle.bg} ${typeStyle.text}`}>
                      {typeStyle.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays size={14} />
                      {event.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                  </div>

                  {/* Attendance bar */}
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>

                  {/* Badge reward */}
                  {event.badge && (
                    <div className="flex items-center gap-2 bg-[var(--color-orange)]/5 border border-[var(--color-orange)]/20 rounded-xl px-3 py-2 mb-4">
                      <Award size={16} style={{ color: "var(--color-orange)" }} />
                      <span className="text-xs font-bold text-foreground">
                        Check-in to unlock: <span style={{ color: "var(--color-orange)" }}>{event.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    {event.checkedIn ? (
                      <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary/10 text-primary rounded-2xl font-bold text-sm border-2 border-primary/20">
                        <CheckCircle2 size={18} />
                        Checked In
                      </div>
                    ) : event.registered ? (
                      <>
                        <button
                          onClick={() => checkIn(event.id)}
                          className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all border-2 border-primary active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          <MapPin size={16} />
                          Check-in via GPS
                        </button>
                        <button
                          onClick={() => toggleRegister(event.id)}
                          className="px-4 py-3 bg-secondary text-foreground rounded-2xl font-bold text-sm hover:bg-secondary/80 transition-all border-2 border-border"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleRegister(event.id)}
                        className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all border-2 border-primary active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <Users size={16} />
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowScanner(false)}
        >
          <div
            className="bg-card border-2 border-border rounded-3xl max-w-sm w-full p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-orange)]/10 flex items-center justify-center mx-auto mb-4">
              <QrCode size={32} style={{ color: "var(--color-orange)" }} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Scan QR Code</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Point your camera at a Vitalia QR code to check-in and unlock exclusive digital badges.
            </p>
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-border rounded-2xl flex items-center justify-center mb-6 bg-secondary/30">
              <div className="text-center">
                <QrCode size={48} className="text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Camera preview</p>
              </div>
            </div>
            <button
              onClick={() => setShowScanner(false)}
              className="w-full py-3 bg-secondary text-foreground rounded-2xl font-bold text-sm border-2 border-border hover:bg-secondary/80 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import {
  MapPin,
  Navigation,
  Users,
  Calendar,
  Dumbbell,
  Coffee,
  Search,
  X,
  Maximize2,
  Minimize2,
  Locate,
  ChevronRight,
  Mountain,
} from "lucide-react"

// Dynamic import for map
const MapComponent = dynamic(() => import("@/components/map-viewer"), { ssr: false })

interface Friend {
  id: string
  name: string
  avatar: string
  latitude: number
  longitude: number
  lastSeen: string
  status: string
  color: string
}

interface POI {
  id: string
  type: "club" | "event" | "gym" | "cafe" | "hiking"
  name: string
  latitude: number
  longitude: number
  description: string
  distance: string
  attendees?: number
  time?: string
  difficulty?: string
}

interface HikingRoute {
  id: string
  name: string
  distance: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard"
  elevation: string
  coordinates: [number, number][]
}

const friends: Friend[] = [
  {
    id: "1",
    name: "Karim H.",
    avatar: "KH",
    latitude: 36.7538 + 0.015,
    longitude: 3.0588 + 0.01,
    lastSeen: "2 min ago",
    status: "At the gym",
    color: "var(--color-activity)",
  },
  {
    id: "2",
    name: "Sara M.",
    avatar: "SM",
    latitude: 36.7538 - 0.01,
    longitude: 3.0588 + 0.015,
    lastSeen: "5 min ago",
    status: "Running Club",
    color: "var(--color-blue)",
  },
  {
    id: "3",
    name: "Youssef D.",
    avatar: "YD",
    latitude: 36.7538 + 0.02,
    longitude: 3.0588 - 0.01,
    lastSeen: "12 min ago",
    status: "Coffee break",
    color: "var(--color-orange)",
  },
]

const pois: POI[] = [
  {
    id: "1",
    type: "club",
    name: "Running Club Algiers",
    latitude: 36.7538 - 0.01,
    longitude: 3.0588 + 0.015,
    description: "Weekly group runs",
    distance: "0.8 km",
    attendees: 12,
  },
  {
    id: "2",
    type: "event",
    name: "Morning Yoga",
    latitude: 36.7538 - 0.015,
    longitude: 3.0588 - 0.015,
    description: "Mindfulness Workshop",
    distance: "1.2 km",
    time: "Tomorrow 7:00 AM",
    attendees: 8,
  },
  {
    id: "3",
    type: "gym",
    name: "FitZone Gym",
    latitude: 36.7538 + 0.015,
    longitude: 3.0588 + 0.01,
    description: "24/7 Fitness Center",
    distance: "1.5 km",
  },
  {
    id: "4",
    type: "cafe",
    name: "Healthy Bites",
    latitude: 36.7538 + 0.02,
    longitude: 3.0588 - 0.01,
    description: "Organic smoothies & bowls",
    distance: "2.1 km",
  },
  {
    id: "5",
    type: "hiking",
    name: "Tassili N'Ajjer Trek",
    latitude: 36.7538 + 0.025,
    longitude: 3.0588 + 0.02,
    description: "UNESCO World Heritage Site",
    distance: "3.2 km",
    difficulty: "Hard",
  },
]

const hikingRoutes: HikingRoute[] = [
  {
    id: "1",
    name: "Algiers Coastal Path",
    distance: "8.5 km",
    duration: "2.5 hrs",
    difficulty: "Easy",
    elevation: "120m",
    coordinates: [
      [36.7538, 3.0588],
      [36.7548, 3.0598],
      [36.7558, 3.0608],
      [36.7568, 3.0618],
    ],
  },
  {
    id: "2",
    name: "Beni Messous Forest Trail",
    distance: "12 km",
    duration: "4 hrs",
    difficulty: "Medium",
    elevation: "450m",
    coordinates: [
      [36.7438, 3.0488],
      [36.7448, 3.0498],
      [36.7458, 3.0508],
      [36.7468, 3.0518],
    ],
  },
]

export default function MapPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [filter, setFilter] = useState<"all" | "friends" | "events" | "places" | "hiking">("all")
  const [showRoutes, setShowRoutes] = useState(false)
  const mapRef = useRef(null)

  const centerOnUser = () => {
    if (mapRef.current) {
      (mapRef.current as any).flyTo([36.7538, 3.0588], 13)
    }
  }

  const getIconForPOI = (type: string) => {
    switch (type) {
      case "club":
        return Users
      case "event":
        return Calendar
      case "gym":
        return Dumbbell
      case "cafe":
        return Coffee
      case "hiking":
        return Mountain
      default:
        return MapPin
    }
  }

  const filteredPOIs = pois.filter((poi) => {
    if (filter === "friends") return false
    if (filter === "events") return poi.type === "event" || poi.type === "club"
    if (filter === "places") return poi.type === "gym" || poi.type === "cafe"
    if (filter === "hiking") return poi.type === "hiking"
    return true
  })

  const filteredFriends = filter === "all" || filter === "friends" ? friends : []

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-16 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Map</h1>
              <p className="text-xs text-muted-foreground">Algiers, Algeria</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-xl glass-button hover:bg-secondary/50 transition-all"
              >
                <Search size={18} className="text-muted-foreground" />
              </button>
              <button
                onClick={centerOnUser}
                className="p-2 rounded-xl glass-button hover:bg-secondary/50 transition-all"
              >
                <Locate size={18} className="text-primary" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {[
              { id: "all", label: "All" },
              { id: "friends", label: "Friends" },
              { id: "events", label: "Events" },
              { id: "places", label: "Places" },
              { id: "hiking", label: "Hiking" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${
                  filter === f.id
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-40 left-0 right-0 z-50 px-4 animate-slide-down">
          <div className="max-w-2xl mx-auto glass-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <Search size={20} className="text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends, places, events, trails..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={() => setShowSearch(false)} className="p-1.5 rounded-lg hover:bg-secondary">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="fixed inset-0 top-[180px] bottom-24 md:bottom-0">
        <MapComponent
          ref={mapRef}
          friends={filteredFriends}
          pois={filteredPOIs}
          routes={showRoutes ? hikingRoutes : []}
        />
      </div>

      {/* Routes Toggle */}
      <button
        onClick={() => setShowRoutes(!showRoutes)}
        className={`fixed bottom-32 md:bottom-8 right-4 z-30 px-4 py-3 rounded-full glass-card border-2 border-border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
          showRoutes ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-600" : "text-foreground"
        }`}
      >
        <Mountain size={18} />
        <span className="text-sm font-bold">{showRoutes ? "Hide" : "Show"} Routes</span>
      </button>

      {/* Friend Detail Card */}
      {selectedFriend && (
        <div className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:w-80 z-40 animate-slide-up">
          <div className="glass-card rounded-3xl p-4 border-2 border-border shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-white/10">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold border-2 flex-shrink-0"
                style={{ borderColor: selectedFriend.color }}
              >
                {selectedFriend.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-foreground">{selectedFriend.name}</h3>
                  <button onClick={() => setSelectedFriend(null)} className="p-1 rounded-lg hover:bg-secondary">
                    <X size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedFriend.status}</p>
                <p className="text-xs text-muted-foreground mb-3">{selectedFriend.lastSeen}</p>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  <Navigation size={14} />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POI Detail Card */}
      {selectedPOI && (
        <div className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:w-80 z-40 animate-slide-up">
          <div className="glass-card rounded-3xl p-4 border-2 border-border shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-white/10">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
                style={{
                  backgroundColor: `color-mix(in srgb, ${
                    selectedPOI.type === "event"
                      ? "var(--color-orange)"
                      : selectedPOI.type === "hiking"
                      ? "var(--color-blue)"
                      : "var(--muted-foreground)"
                  } 15%, transparent)`,
                  borderColor:
                    selectedPOI.type === "event"
                      ? "var(--color-orange)"
                      : selectedPOI.type === "hiking"
                      ? "var(--color-blue)"
                      : "var(--border)",
                }}
              >
                {(() => {
                  const Icon = getIconForPOI(selectedPOI.type)
                  return (
                    <Icon
                      size={18}
                      style={{
                        color:
                          selectedPOI.type === "event"
                            ? "var(--color-orange)"
                            : selectedPOI.type === "hiking"
                            ? "var(--color-blue)"
                            : "var(--muted-foreground)",
                      }}
                    />
                  )
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-foreground">{selectedPOI.name}</h3>
                  <button onClick={() => setSelectedPOI(null)} className="p-1 rounded-lg hover:bg-secondary">
                    <X size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedPOI.description}</p>
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    {selectedPOI.distance}
                  </div>
                  {selectedPOI.attendees && (
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      {selectedPOI.attendees} going
                    </div>
                  )}
                  {selectedPOI.time && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedPOI.time}
                    </div>
                  )}
                  {selectedPOI.difficulty && (
                    <div className="flex items-center gap-1">
                      <Mountain size={12} />
                      {selectedPOI.difficulty}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <Navigation size={14} />
                    Directions
                  </button>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 transition-all">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

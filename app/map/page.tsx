"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"

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
  type: "club" | "event" | "gym" | "cafe"
  name: string
  latitude: number
  longitude: number
  description: string
  distance: string
  attendees?: number
  time?: string
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
  {
    id: "4",
    name: "Nadia K.",
    avatar: "NK",
    latitude: 36.7538 - 0.015,
    longitude: 3.0588 - 0.015,
    lastSeen: "30 min ago",
    status: "Yoga session",
    color: "var(--color-mindfulness)",
  },
]

const pois: POI[] = [
  {
    id: "1",
    type: "club",
    name: "Running Club",
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
    type: "event",
    name: "10km Challenge",
    latitude: 36.7538 + 0.025,
    longitude: 3.0588 + 0.02,
    description: "Saturday Community Run",
    distance: "3.2 km",
    time: "Sat 6:30 AM",
    attendees: 45,
  },
]

export default function MapPage() {
  const [userLocation, setUserLocation] = useState({ lat: 36.7538, lng: 3.0588 })
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [filter, setFilter] = useState<"all" | "friends" | "events" | "places">("all")

  const centerOnUser = () => {
    setMapOffset({ x: 0, y: 0 })
    setMapZoom(1)
  }

  const latLngToPixel = (lat: number, lng: number) => {
    const centerX = 400
    const centerY = 400
    const scale = 8000 * mapZoom

    const x = centerX + (lng - userLocation.lng) * scale + mapOffset.x
    const y = centerY - (lat - userLocation.lat) * scale + mapOffset.y

    return { x, y }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
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
      default:
        return MapPin
    }
  }

  const filteredPOIs = pois.filter((poi) => {
    if (filter === "friends") return false
    if (filter === "events") return poi.type === "event" || poi.type === "club"
    if (filter === "places") return poi.type === "gym" || poi.type === "cafe"
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
                placeholder="Search friends, places, events..."
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
      <div
        className="fixed inset-0 top-[180px] bottom-20 md:bottom-0 cursor-move select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Roads/Paths */}
        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
          {/* Main roads */}
          <g opacity="0.3">
            <path
              d={`M ${latLngToPixel(36.7538, 3.0588 - 0.03).x} ${latLngToPixel(36.7538, 3.0588 - 0.03).y}
                  L ${latLngToPixel(36.7538, 3.0588 + 0.03).x} ${latLngToPixel(36.7538, 3.0588 + 0.03).y}`}
              stroke="var(--border)"
              strokeWidth="4"
              fill="none"
            />
            <path
              d={`M ${latLngToPixel(36.7538 - 0.03, 3.0588).x} ${latLngToPixel(36.7538 - 0.03, 3.0588).y}
                  L ${latLngToPixel(36.7538 + 0.03, 3.0588).x} ${latLngToPixel(36.7538 + 0.03, 3.0588).y}`}
              stroke="var(--border)"
              strokeWidth="4"
              fill="none"
            />
          </g>
        </svg>

        {/* POIs */}
        {filteredPOIs.map((poi) => {
          const pos = latLngToPixel(poi.latitude, poi.longitude)
          const Icon = getIconForPOI(poi.type)
          return (
            <button
              key={poi.id}
              onClick={() => setSelectedPOI(poi)}
              className="absolute animate-bounce-in"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${Math.random() * 300}ms`,
              }}
            >
              <div className="relative group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center glass-card border-2 hover:scale-110 transition-transform ${
                    selectedPOI?.id === poi.id ? "ring-4 ring-primary/50" : ""
                  }`}
                  style={{
                    borderColor:
                      poi.type === "event"
                        ? "var(--color-orange)"
                        : poi.type === "club"
                          ? "var(--color-blue)"
                          : "var(--border)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{
                      color:
                        poi.type === "event"
                          ? "var(--color-orange)"
                          : poi.type === "club"
                            ? "var(--color-blue)"
                            : "var(--muted-foreground)",
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="bg-card border-2 border-border rounded-lg px-2 py-1 text-xs font-bold text-foreground shadow-lg">
                    {poi.name}
                  </div>
                </div>
              </div>
            </button>
          )
        })}

        {/* Friends */}
        {filteredFriends.map((friend) => {
          const pos = latLngToPixel(friend.latitude, friend.longitude)
          return (
            <button
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              className="absolute animate-fade-scale"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${Math.random() * 300}ms`,
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ borderColor: friend.color }} />
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm border-4 hover:scale-110 transition-transform shadow-lg ${
                    selectedFriend?.id === friend.id ? "ring-4 ring-primary/50 scale-110" : ""
                  }`}
                  style={{ borderColor: friend.color }}
                >
                  {friend.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="bg-card border-2 border-border rounded-lg px-2 py-1 text-xs font-bold text-foreground shadow-lg">
                    {friend.name}
                  </div>
                </div>
              </div>
            </button>
          )
        })}

        {/* User Location */}
        <div
          className="absolute"
          style={{
            left: `${latLngToPixel(userLocation.lat, userLocation.lng).x}px`,
            top: `${latLngToPixel(userLocation.lat, userLocation.lng).y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-pulse-ring" />
            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary border-4 border-card flex items-center justify-center shadow-2xl">
                <Navigation size={16} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="fixed bottom-32 md:bottom-8 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setMapZoom(Math.min(mapZoom * 1.5, 3))}
          className="w-12 h-12 rounded-full glass-card border-2 border-border flex items-center justify-center hover:bg-secondary/50 transition-all active:scale-95"
        >
          <Maximize2 size={18} className="text-foreground" />
        </button>
        <button
          onClick={() => setMapZoom(Math.max(mapZoom / 1.5, 0.5))}
          className="w-12 h-12 rounded-full glass-card border-2 border-border flex items-center justify-center hover:bg-secondary/50 transition-all active:scale-95"
        >
          <Minimize2 size={18} className="text-foreground" />
        </button>
      </div>

      {/* Friend Detail Card */}
      {selectedFriend && (
        <div className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:w-80 z-40 animate-slide-up">
          <div className="glass-card rounded-3xl p-4 border-2 border-border shadow-2xl">
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
          <div className="glass-card rounded-3xl p-4 border-2 border-border shadow-2xl">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
                style={{
                  backgroundColor: `color-mix(in srgb, ${
                    selectedPOI.type === "event"
                      ? "var(--color-orange)"
                      : selectedPOI.type === "club"
                        ? "var(--color-blue)"
                        : "var(--muted-foreground)"
                  } 15%, transparent)`,
                  borderColor:
                    selectedPOI.type === "event"
                      ? "var(--color-orange)"
                      : selectedPOI.type === "club"
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
                            : selectedPOI.type === "club"
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
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
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
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <Navigation size={14} />
                    Directions
                  </button>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 transition-all border-2 border-border">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="fixed top-[250px] left-4 z-30 glass-card rounded-2xl p-3 border-2 border-border hidden md:block">
        <p className="text-xs font-bold text-foreground mb-2">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-primary/70" />
            <span className="text-xs text-muted-foreground">Friends</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={12} style={{ color: "var(--color-orange)" }} />
            <span className="text-xs text-muted-foreground">Events</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={12} style={{ color: "var(--color-blue)" }} />
            <span className="text-xs text-muted-foreground">Clubs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

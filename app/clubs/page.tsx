"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Users, Brain, MapPin, MessageCircle, HandHeart, Calendar, Shield, Verified, TrendingUp, ChevronRight, X } from "lucide-react"

const MapComponent = dynamic(() => import("@/components/map-viewer"), { ssr: false })

interface ClubPost {
  id: string
  author: string
  avatar: string
  content: string
  time: string
  highFives: number
  replies: number
  highFived: boolean
  anonymous: boolean
}

interface ClubLocation {
  id: string
  name: string
  latitude: number
  longitude: number
  members: number
  nextEvent: string
}

const runningClubPosts: ClubPost[] = [
  {
    id: "r1",
    author: "Elmehdi B.",
    avatar: "EB",
    content: "Just finished a 10km morning run around Algiers Bay! The sunrise was incredible. Who is joining me this weekend?",
    time: "1h ago",
    highFives: 24,
    replies: 6,
    highFived: false,
    anonymous: false,
  },
  {
    id: "r2",
    author: "Karim H.",
    avatar: "KH",
    content: "New personal best on 5km: 23:45! Training for the ITC Challenge is paying off. Keep pushing, everyone!",
    time: "3h ago",
    highFives: 42,
    replies: 12,
    highFived: false,
    anonymous: false,
  },
]

const psychClubPosts: ClubPost[] = [
  {
    id: "p1",
    author: "Anonymous",
    avatar: "?",
    content: "Today I practiced saying 'no' to something that was draining my energy. It felt scary but freeing. Small wins matter.",
    time: "2h ago",
    highFives: 67,
    replies: 15,
    highFived: false,
    anonymous: true,
  },
]

const clubLocations: ClubLocation[] = [
  {
    id: "1",
    name: "Running Club Algiers",
    latitude: 36.7538 - 0.01,
    longitude: 3.0588 + 0.015,
    members: 247,
    nextEvent: "Tomorrow 7:00 AM",
  },
  {
    id: "2",
    name: "Psych Support Hub",
    latitude: 36.7538 - 0.015,
    longitude: 3.0588 - 0.015,
    members: 184,
    nextEvent: "Today 5:00 PM",
  },
]

type ClubTab = "map" | "running" | "psych"

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState<ClubTab>("map")
  const [runningPosts, setRunningPosts] = useState(runningClubPosts)
  const [psychPosts, setPsychPosts] = useState(psychClubPosts)
  const [selectedLocation, setSelectedLocation] = useState<ClubLocation | null>(null)

  const posts = activeClub === "running" ? runningPosts : activeClub === "psych" ? psychPosts : []
  const setPosts = activeClub === "running" ? setRunningPosts : setPsychPosts

  const toggleHighFive = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              highFived: !post.highFived,
              highFives: post.highFived ? post.highFives - 1 : post.highFives + 1,
            }
          : post,
      ),
    )
  }

  const clubPois = clubLocations.map((loc) => ({
    id: loc.id,
    type: "club" as const,
    name: loc.name,
    latitude: loc.latitude,
    longitude: loc.longitude,
    description: `${loc.members} members • ${loc.nextEvent}`,
  }))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b-2 border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground mb-1">Community Clubs</h1>
          <p className="text-sm text-muted-foreground mb-4">Connect, share, and grow together</p>

          {/* Club tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveClub("map")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                activeClub === "map"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/20"
              }`}
            >
              <MapPin size={18} />
              Clubs Map
            </button>
            <button
              onClick={() => setActiveClub("running")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                activeClub === "running"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/20"
              }`}
            >
              <MapPin size={18} />
              Running
            </button>
            <button
              onClick={() => setActiveClub("psych")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                activeClub === "psych"
                  ? "bg-[var(--color-blue)]/10 border-[var(--color-blue)]/30 text-foreground"
                  : "bg-card border-border text-muted-foreground hover:border-[var(--color-blue)]/20"
              }`}
            >
              <Brain size={18} />
              Mental
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeClub === "map" && (
          <div className="space-y-4">
            {/* Map Container */}
            <div className="glass-card rounded-3xl overflow-hidden h-96 border-2 border-border">
              <MapComponent friends={[]} pois={clubPois} routes={[]} />
            </div>

            {/* Club Locations List */}
            <div className="space-y-3">
              {clubLocations.map((club) => (
                <div
                  key={club.id}
                  onClick={() => setSelectedLocation(club)}
                  className="glass-card rounded-2xl p-4 border-2 border-border cursor-pointer hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{club.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {club.members} members
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {club.nextEvent}
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-all">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Location Detail Modal */}
            {selectedLocation && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center">
                <div className="glass-card rounded-3xl p-6 w-full md:w-96 border-2 border-border max-h-[90vh] overflow-y-auto animate-slide-up md:animate-scale-in">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedLocation.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedLocation.members} active members</p>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="p-1.5 rounded-lg hover:bg-secondary transition-all"
                    >
                      <X size={20} className="text-muted-foreground" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-secondary/30 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Next Event</p>
                      <p className="font-bold text-foreground">{selectedLocation.nextEvent}</p>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
                    Join Club
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {(activeClub === "running" || activeClub === "psych") && (
          <>
            {/* Club Info Card */}
            {activeClub === "running" ? (
              <div className="bg-card border-2 border-primary/20 rounded-3xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Running Club</h2>
                    <p className="text-xs text-muted-foreground">1,247 active members</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 border-2 border-primary active:scale-[0.98]">
                  <Users size={16} />
                  Join Group Run
                </button>
              </div>
            ) : (
              <div className="bg-card border-2 border-[var(--color-blue)]/20 rounded-3xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--color-blue) 10%, transparent)" }}>
                    <Brain size={24} style={{ color: "var(--color-blue)" }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Safe Space</h2>
                    <p className="text-xs text-muted-foreground">Anonymous & supportive</p>
                  </div>
                </div>
                <button className="w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 active:scale-[0.98]" style={{ backgroundColor: "color-mix(in srgb, var(--color-blue) 10%, transparent)", borderColor: "color-mix(in srgb, var(--color-blue) 30%, transparent)", color: "var(--color-blue)" }}>
                  <MessageCircle size={16} />
                  Share
                </button>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="bg-card border-2 border-border rounded-2xl p-4 hover:border-primary/20 transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${post.anonymous ? "bg-secondary text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-foreground">{post.author}</span>
                        {!post.anonymous && post.author.includes("Dr.") && <Verified size={14} className="text-primary fill-primary" />}
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed mb-3">{post.content}</p>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleHighFive(post.id)}
                          className={`flex items-center gap-1.5 text-sm font-semibold transition-all active:scale-95 ${
                            post.highFived ? "text-[var(--color-orange)]" : "text-muted-foreground hover:text-[var(--color-orange)]"
                          }`}
                        >
                          <HandHeart size={18} fill={post.highFived ? "currentColor" : "none"} className="transition-transform hover:scale-110" />
                          <span>{post.highFives}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <MessageCircle size={16} />
                          <span>{post.replies}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

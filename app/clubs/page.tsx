"use client"

import { useState } from "react"
import {
  Users,
  Brain,
  MapPin,
  MessageCircle,
  HandHeart,
  Calendar,
  Shield,
  Verified,
  TrendingUp,
  ChevronRight,
} from "lucide-react"

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
  {
    id: "r3",
    author: "Sara M.",
    avatar: "SM",
    content: "Looking for running partners in Oran area. I usually run 3 times a week, 5-7km. Drop a comment if interested!",
    time: "5h ago",
    highFives: 18,
    replies: 8,
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
  {
    id: "p2",
    author: "Dr. Amina Benali",
    avatar: "AB",
    content: "Daily Reflection: What is one thing you are grateful for today? Research shows gratitude journaling can improve mood by 25%.",
    time: "4h ago",
    highFives: 89,
    replies: 34,
    highFived: false,
    anonymous: false,
  },
  {
    id: "p3",
    author: "Anonymous",
    avatar: "?",
    content: "Had a panic attack at work today. Used the 4-7-8 breathing technique from the app and it helped. Thank you for this community.",
    time: "6h ago",
    highFives: 112,
    replies: 22,
    highFived: false,
    anonymous: true,
  },
]

type ClubTab = "running" | "psych"

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState<ClubTab>("running")
  const [runningPosts, setRunningPosts] = useState(runningClubPosts)
  const [psychPosts, setPsychPosts] = useState(psychClubPosts)

  const posts = activeClub === "running" ? runningPosts : psychPosts
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
              onClick={() => setActiveClub("running")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                activeClub === "running"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/20"
              }`}
            >
              <MapPin size={18} />
              Running Club
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
              Psychological Club
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Club Info Card */}
        {activeClub === "running" ? (
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">The Running Club</h2>
                <p className="text-xs text-muted-foreground">1,247 active members</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-xl text-xs text-muted-foreground">
                <TrendingUp size={12} className="text-primary" />
                +58 this week
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-xl text-xs text-muted-foreground">
                <Calendar size={12} />
                3 group runs planned
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 border-2 border-primary active:scale-[0.98]">
              <Users size={16} />
              Join Group Run This Weekend
            </button>
          </div>
        ) : (
          <div className="bg-card border-2 border-[var(--color-blue)]/20 rounded-3xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--color-blue) 10%, transparent)" }}>
                <Shield size={24} style={{ color: "var(--color-blue)" }} />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Safe Space</h2>
                <p className="text-xs text-muted-foreground">Anonymous & supportive community</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              A moderated, professional-backed space for daily reflections, mental health support, and growth. All posts can be anonymous.
            </p>
            <button className="w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 active:scale-[0.98]" style={{ backgroundColor: "color-mix(in srgb, var(--color-blue) 10%, transparent)", borderColor: "color-mix(in srgb, var(--color-blue) 30%, transparent)", color: "var(--color-blue)" }}>
              <MessageCircle size={16} />
              Share a Reflection
            </button>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-card border-2 border-border rounded-2xl p-4 hover:border-primary/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    post.anonymous
                      ? "bg-secondary text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-foreground">{post.author}</span>
                    {!post.anonymous && post.author.includes("Dr.") && (
                      <Verified size={14} className="text-primary fill-primary" />
                    )}
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">{post.content}</p>

                  {/* Actions - High Five instead of Like */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleHighFive(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-semibold transition-all active:scale-95 ${
                        post.highFived
                          ? "text-[var(--color-orange)]"
                          : "text-muted-foreground hover:text-[var(--color-orange)]"
                      }`}
                    >
                      <HandHeart
                        size={18}
                        fill={post.highFived ? "currentColor" : "none"}
                        className="transition-transform hover:scale-110"
                      />
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
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { HandHeart, MessageCircle, Bookmark, MoreHorizontal, Verified, Zap, Send, X, TrendingUp, BookOpen } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  time: string
  likes: number
}

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  authorHandle: string
  authorVerified: boolean
  authorAvatar: string
  image?: string
  category: string
  date: string
  likes: number
  comments: Comment[]
  liked: boolean
  saved: boolean
  readTime: number
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Morning routines backed by science",
    content: "Starting your day right is crucial for establishing healthy habits. A consistent morning routine can improve your mental clarity, boost energy levels, and set a positive tone for the entire day. Here's what research shows about the most effective morning practices...",
    author: "Dr. Sarah Chen",
    authorHandle: "drsarahchen",
    authorVerified: true,
    authorAvatar: "SC",
    image: "/morning-routine-wellness.jpg",
    category: "Wellness",
    date: "2h",
    likes: 234,
    comments: [
      { id: "c1", author: "Karim H.", avatar: "KH", content: "This changed my morning completely! The cold shower tip was game-changing.", time: "1h", likes: 12 },
      { id: "c2", author: "Sara M.", avatar: "SM", content: "Great article. I've been doing this for 2 weeks and feel much better.", time: "45m", likes: 8 },
    ],
    liked: false,
    saved: false,
    readTime: 5,
  },
  {
    id: "2",
    title: "Simple eco-friendly swaps for your home",
    content: "Sustainability doesn't have to be complicated. Small changes in your daily habits can have a significant cumulative impact on the environment. Here are 5 easy switches you can make today that will reduce your carbon footprint without breaking the bank.",
    author: "Emma Thompson",
    authorHandle: "emmawellness",
    authorVerified: false,
    authorAvatar: "ET",
    image: "/eco-friendly-sustainable-living.jpg",
    category: "Eco-Living",
    date: "4h",
    likes: 189,
    comments: [
      { id: "c3", author: "Nadia K.", avatar: "NK", content: "Love the bamboo toothbrush tip! Already ordered mine.", time: "2h", likes: 5 },
    ],
    liked: false,
    saved: false,
    readTime: 4,
  },
  {
    id: "3",
    title: "Breaking the stress cycle: Evidence-based strategies",
    content: "Stress is a natural part of life, but chronic stress can impact your physical and mental health. Learning to recognize stress triggers and implement coping mechanisms is essential. The 4-7-8 breathing technique has been shown to activate your parasympathetic nervous system...",
    author: "Dr. James Rodriguez",
    authorHandle: "drjamespsych",
    authorVerified: true,
    authorAvatar: "JR",
    image: "/mental-wellness-meditation.jpg",
    category: "Mental Resilience",
    date: "6h",
    likes: 312,
    comments: [
      { id: "c4", author: "Elmehdi B.", avatar: "EB", content: "The breathing technique really works. I use it before every exam.", time: "4h", likes: 15 },
      { id: "c5", author: "Dr. Amina B.", avatar: "AB", content: "Great overview! I recommend this to all my patients.", time: "3h", likes: 22 },
    ],
    liked: false,
    saved: false,
    readTime: 6,
  },
  {
    id: "4",
    title: "Building a balanced plate: Nutrition fundamentals",
    content: "A balanced diet is the foundation of good health. Understanding macronutrients and micronutrients helps you make informed food choices. Aim for half your plate to be vegetables, a quarter protein, and a quarter complex carbohydrates.",
    author: "Emily Watson",
    authorHandle: "emilynutrition",
    authorVerified: true,
    authorAvatar: "EW",
    image: "/balanced-nutrition-healthy-food.jpg",
    category: "Nutrition",
    date: "8h",
    likes: 267,
    comments: [
      { id: "c6", author: "Youssef D.", avatar: "YD", content: "Finally a clear explanation of macros! Saved this article.", time: "5h", likes: 9 },
    ],
    liked: false,
    saved: false,
    readTime: 7,
  },
  {
    id: "5",
    title: "Why you're not sleeping well (and how to fix it)",
    content: "Quality sleep is essential for optimal health. Most adults need 7-9 hours per night, but it's not just about quantity - sleep quality matters too. Here are the top 3 sleep disruptors and science-backed solutions...",
    author: "Dr. Michael Park",
    authorHandle: "drmichaelsleep",
    authorVerified: true,
    authorAvatar: "MP",
    category: "Physical Recovery",
    date: "12h",
    likes: 198,
    comments: [],
    liked: false,
    saved: false,
    readTime: 8,
  },
  {
    id: "6",
    title: "Home workouts that actually work",
    content: "You don't need a gym to get fit. Bodyweight exercises, resistance bands, and minimal equipment can give you an effective full-body workout. The key is consistency and progressive overload. Here's a 4-week program to get you started...",
    author: "Coach Maria Santos",
    authorHandle: "coachmaria",
    authorVerified: false,
    authorAvatar: "MS",
    category: "Physical Recovery",
    date: "1d",
    likes: 156,
    comments: [
      { id: "c7", author: "Karim H.", avatar: "KH", content: "Week 2 done! Seeing real progress with this program.", time: "8h", likes: 6 },
    ],
    liked: false,
    saved: false,
    readTime: 9,
  },
  {
    id: "7",
    title: "The gut-brain connection explained",
    content: "Your gut is often called your 'second brain' for good reason. The enteric nervous system contains over 100 million neurons and produces 95% of your body's serotonin. Here's how to optimize your gut health for better mood and cognition...",
    author: "Dr. Aisha Patel",
    authorHandle: "draishagut",
    authorVerified: true,
    authorAvatar: "AP",
    category: "Nutrition",
    date: "1d",
    likes: 445,
    comments: [
      { id: "c8", author: "Sara M.", avatar: "SM", content: "Mind-blowing article! Never knew the gut produced serotonin.", time: "12h", likes: 18 },
    ],
    liked: false,
    saved: false,
    readTime: 10,
  },
  {
    id: "8",
    title: "Hydration myths debunked",
    content: "Do you really need 8 glasses of water a day? The answer is more nuanced than you think. Your hydration needs depend on your activity level, climate, and diet. Here's the science behind proper hydration...",
    author: "Dr. Sarah Chen",
    authorHandle: "drsarahchen",
    authorVerified: true,
    authorAvatar: "SC",
    image: "/hydration-myths.jpg",
    category: "Nutrition",
    date: "2d",
    likes: 523,
    comments: [],
    liked: false,
    saved: false,
    readTime: 11,
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPosts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const categories = ["all", "Nutrition", "Mental Resilience", "Physical Recovery", "Wellness", "Eco-Living"]

  const filteredPosts = posts.filter((post) => {
    return selectedCategory === "all" || post.category === selectedCategory
  })

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const toggleSave = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post,
      ),
    )
  }

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })
  }

  const addComment = (postId: string) => {
    const content = commentInputs[postId]?.trim()
    if (!content) return

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c-${Date.now()}`,
                  author: "Elmehdi B.",
                  avatar: "EB",
                  content,
                  time: "now",
                  likes: 0,
                },
              ],
            }
          : post,
      ),
    )
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
  }

  // Category counts for sidebar
  const categoryCounts = categories.reduce(
    (acc, cat) => {
      acc[cat] = cat === "all" ? posts.length : posts.filter((p) => p.category === cat).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-16 z-40 glass-nav border-b-2 border-border/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">Explore Ideas</h1>
              <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl">
                <Zap size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary">Earn VP by reading</span>
              </div>
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden px-3 py-1.5 rounded-xl border-2 border-border text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
            >
              {selectedCategory === "all" ? "Filter" : selectedCategory}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Filter Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r-2 border-border p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Categories</h3>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-secondary">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setMobileSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary/10 text-primary border-2 border-primary/20"
                      : "text-muted-foreground hover:bg-secondary/50 border-2 border-transparent"
                  }`}
                >
                  <span>{cat === "all" ? "For you" : cat}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{categoryCounts[cat]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Desktop Side Filter */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-36 space-y-6">
              <div className="glass-card rounded-2xl p-4 border-0">
                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Categories</h3>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        selectedCategory === cat
                          ? "glass-card border border-primary/40 text-primary shadow-sm shadow-primary/20"
                          : "text-muted-foreground hover:bg-white/10 dark:hover:bg-white/5 border-2 border-transparent hover:border-border"
                      }`}
                  >
                    <span>{cat === "all" ? "For you" : cat}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{categoryCounts[cat]}</span>
                  </button>
                ))}
              </nav>

                </nav>
              </div>
              {/* Trending sidebar */}
              <div className="glass-card rounded-2xl p-4 border-0">
                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={14} className="text-orange-500" />
                  Trending
                </h3>
                <div className="space-y-3">
                  {posts
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 3)
                    .map((post, i) => (
                      <button key={post.id} className="w-full p-2.5 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300 group text-left">
                        <div className="flex items-start gap-2.5">
                          <span className="text-lg font-bold text-primary/50 group-hover:text-primary transition-colors">{`0${i + 1}`}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{post.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{post.author}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              </div>
              {/* Reading stats */}
              <div className="glass-card rounded-2xl p-4 border-0 bg-gradient-to-br from-primary/15 to-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-primary" />
                  <h4 className="text-xs font-bold text-foreground">Your Reading</h4>
                </div>
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-[10px] text-muted-foreground">VitaPoints earned from articles</p>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-6 font-medium">{filteredPosts.length} articles found</p>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="glass-card rounded-xl p-4 sm:p-6 border-0 hover:border hover:border-border/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Author row */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {post.authorAvatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Author info */}
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap group">
                        <span className="font-semibold text-foreground text-sm hover:text-primary transition-colors cursor-pointer">{post.author}</span>
                        {post.authorVerified && (
                          <Verified size={14} className="text-primary fill-primary" />
                        )}
                        <span className="text-muted-foreground text-sm">@{post.authorHandle}</span>
                        <span className="text-muted-foreground text-sm hidden sm:inline">·</span>
                        <span className="text-muted-foreground text-sm hidden sm:inline">{post.date}</span>
                        <button className="ml-auto p-1.5 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                          <MoreHorizontal size={16} className="text-muted-foreground" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-foreground mb-1">{post.title}</h3>
                        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                      </div>

                      {/* Image */}
                      {post.image && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                          <img src={post.image || "/placeholder.svg"} alt="" className="w-full h-40 sm:h-56 object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}

                      {/* Category tag */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground sm:hidden">{post.date}</span>
                      </div>

                      {/* VitaPoints reward */}
                      <div className="flex items-center gap-1.5 mb-3 text-xs">
                        <Zap size={12} className="text-primary" />
                        <span className="font-bold text-primary">+10 VP for reading</span>
                        <span className="text-muted-foreground">{post.readTime} min read</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 sm:gap-6 text-muted-foreground pt-2 border-t border-border/30">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 transition-all duration-300 hover:text-orange-500 group -ml-1.5 px-1.5"
                          style={{ color: post.liked ? "var(--color-orange)" : undefined }}
                        >
                          <HandHeart
                            size={18}
                            fill={post.liked ? "currentColor" : "none"}
                            className="group-hover:scale-125 transition-transform"
                          />
                          <span className="text-sm font-semibold">{post.likes}</span>
                        </button>

                        <button
                          onClick={() => toggleComments(post.id)}
                          className={`flex items-center gap-1.5 transition-all duration-300 -ml-1.5 px-1.5 ${
                            expandedComments.has(post.id) ? "text-primary" : "hover:text-primary"
                          }`}
                        >
                          <MessageCircle
                            size={18}
                            fill={expandedComments.has(post.id) ? "currentColor" : "none"}
                          />
                          <span className="text-sm">{post.comments.length}</span>
                        </button>

                        <button
                          onClick={() => toggleSave(post.id)}
                          className="flex items-center gap-1.5 hover:text-primary transition-all duration-300 ml-auto -mr-1.5 px-1.5"
                        >
                          <Bookmark
                            size={18}
                            fill={post.saved ? "currentColor" : "none"}
                            className={post.saved ? "text-primary" : ""}
                          />
                        </button>
                      </div>

                      {/* Comments Section - Medium style */}
                      {expandedComments.has(post.id) && (
                        <div className="mt-4 pt-4 border-t border-border/30 animate-fade-scale">
                          {/* Existing comments */}
                          {post.comments.length > 0 && (
                            <div className="space-y-3 mb-4">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground flex-shrink-0">
                                    {comment.avatar}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-foreground">{comment.author}</span>
                                      <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                                    </div>
                                    <p className="text-sm text-foreground mt-0.5 leading-relaxed">{comment.content}</p>
                                    <button className="text-[10px] text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1">
                                      <HandHeart size={10} />
                                      {comment.likes > 0 && comment.likes}
                                    </button>
                                  </div>
                                </div>
                          {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 group">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0 shadow-sm">
                                    {comment.avatar}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">{comment.author}</span>
                                      <span className="text-[10px] text-muted-foreground">·</span>
                                      <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                                    </div>
                                    <p className="text-sm text-foreground mt-0.5 leading-relaxed">{comment.content}</p>
                                    <button className="text-[10px] text-muted-foreground hover:text-orange-500 mt-1 flex items-center gap-1 transition-colors">
                                      <HandHeart size={10} />
                                      {comment.likes > 0 && comment.likes}
                                    </button>
                                  </div>
                                </div>
                              ))}'
                            </div>
                          )}

                          {/* Add comment input */}
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">
                              EB
                            </div>
                            <div className="flex-1 flex items-center gap-2 bg-secondary/50 rounded-xl px-3 py-2 border-2 border-border focus-within:border-primary/30 transition-all">
                              <input
                                type="text"
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") addComment(post.id)
                                }}
                                placeholder="Write a response..."
                                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                              />
                              <button
                                onClick={() => addComment(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                                className="p-1 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <Send size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
